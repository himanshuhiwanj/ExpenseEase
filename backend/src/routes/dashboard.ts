import express, { Request, Response } from 'express';
import Transaction from '../models/Transaction.js';
import { protect } from './Auth.js';

const DashboardRouter = express.Router();

// @route   GET /api/dashboard
// @desc    Get data for dashboard charts (income vs expenses & expenses by category)
// @access  Private
DashboardRouter.get('/', protect, async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Aggregation for Income vs. Expenses
    const incomeVsExpenseData = await Transaction.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: '$type',
          // Summing on the new 'amount' field
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Aggregation for Expenses by Category
    const expenseByCategoryData = await Transaction.aggregate([
      { $match: { userId: userId, type: 'expense' } },
      {
        $group: {
          _id: '$category',
          // Summing on the new 'amount' field
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    // Format data for frontend charts
    const incomeVsExpense = {
      labels: incomeVsExpenseData.map(d => d._id),
      datasets: [{
        label: 'Total Amount',
        data: incomeVsExpenseData.map(d => d.totalAmount),
      }],
    };

    const expenseByCategory = {
      labels: expenseByCategoryData.map(d => d._id),
      datasets: [{
        data: expenseByCategoryData.map(d => Math.abs(d.totalAmount)),
      }],
    };

    res.json({ incomeVsExpense, expenseByCategory });
  } catch (err) {
    console.error(err instanceof Error ? err.message : "");
    res.status(500).send('Server Error');
  }
});

export default DashboardRouter;
