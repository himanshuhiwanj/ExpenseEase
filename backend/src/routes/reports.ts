import express from 'express';
import { jsPDF } from 'jspdf';
import Transaction from '../models/Transaction.js';
import { protect } from './Auth.js';

const ReportRouter = express.Router();

// @route   GET /api/reports/generate
// @desc    Generate a PDF report of all user transactions
// @access  Private
ReportRouter.get('/', protect, async (req, res) => {
  try {
    const userId = req?.user?._id;

    // Fetch all transactions for the authenticated user, sorted by date
    const transactions = await Transaction.find({ userId: userId }).sort({ date: 1 });

    const doc = new jsPDF();

    // --- Report Header ---
    doc.setFontSize(22);
    doc.text('Financial Report Summary', 10, 20);

    // Add a unique reference ID to the header
    doc.setFontSize(10);
    doc.text('Report Reference: ' + new Date().getTime(), 10, 30);
    
    doc.setFontSize(12);
    doc.text('Date Generated: ' + new Date().toLocaleDateString(), 10, 40);
    doc.text('--------------------------------------------------', 10, 50);

    // --- Table Creation ---
    let yPosition = 60;
    const margin = 10;
    // Fit 7 columns within ~190 usable width
    const columnWidths = [25, 55, 25, 25, 15, 20, 25];
    const headers = ['Date', 'Description', 'Category', 'Reference', 'Type', 'Amount', 'Balance'];
    let runningBalance = 0;
    
    // Add table headers
    doc.setFontSize(10);
    let xPosition = margin;
    headers.forEach((header, index) => {
      doc.text(header, xPosition, yPosition);
      xPosition += columnWidths[index];
    });
    yPosition += 5;
    doc.line(margin, yPosition, margin + columnWidths.reduce((a, b) => a + b, 0), yPosition);
    yPosition += 5;

    // Add table rows from transaction data
    doc.setFontSize(8);
    transactions.forEach((transaction) => {
      if (yPosition > 280) { // Check for new page
        doc.addPage();
        yPosition = 10;
        xPosition = margin;
        // Re-add headers to the new page
        doc.setFontSize(10);
        headers.forEach((header, index) => {
          doc.text(header, xPosition, yPosition);
          xPosition += columnWidths[index];
        });
        yPosition += 5;
        doc.line(margin, yPosition, margin + columnWidths.reduce((a, b) => a + b, 0), yPosition);
        yPosition += 5;
        doc.setFontSize(8);
      }
      
      xPosition = margin;

      // Color-code text by transaction type
      const isExpense = String(transaction.type) === 'expense';
      const rowColor = isExpense ? [200, 0, 0] : [0, 150, 0];
      doc.setTextColor(rowColor[0], rowColor[1], rowColor[2]);
      
      // Format the date for the report
      const formattedDate = new Date(transaction.date).toLocaleDateString();
      doc.text(formattedDate, xPosition, yPosition);
      xPosition += columnWidths[0];

      // Use a fixed width for description to prevent overflow
      const description = doc.splitTextToSize(String(transaction.description ?? ''), columnWidths[1] - 5);
      doc.text(description, xPosition, yPosition);
      xPosition += columnWidths[1];

      doc.text(String(transaction.category ?? ''), xPosition, yPosition);
      xPosition += columnWidths[2];

      // Reference column
      doc.text(String(transaction.reference ?? ''), xPosition, yPosition);
      xPosition += columnWidths[3];

      doc.text(String(transaction.type ?? ''), xPosition, yPosition);
      xPosition += columnWidths[4];

      // Format the amount
      const amountValue = Number(transaction.amount ?? 0);
      doc.text(`₹${Math.abs(amountValue).toFixed(2)}`, xPosition, yPosition);
      xPosition += columnWidths[5];

      // Update and print running balance (income adds, expense subtracts)
      runningBalance += isExpense ? -Math.abs(amountValue) : Math.abs(amountValue);
      doc.text(`₹${runningBalance.toFixed(2)}`, xPosition, yPosition);

      // Reset text color to black for next operations
      doc.setTextColor(0, 0, 0);

      yPosition += 7; // Increment yPosition for the next row
    });

    // --- Final Output ---
    const pdfOutput = doc.output('datauristring');
    const base64Data = pdfOutput.split(',')[1];
    const pdfBuffer = Buffer.from(base64Data, 'base64');
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default ReportRouter;
