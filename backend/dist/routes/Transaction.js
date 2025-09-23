// src/routes/Transaction.ts
import express from 'express';
const TransactionRouter = express.Router();
import Transaction from "../models/Transaction.js";
import { protect } from './Auth.js';
// @route   GET /api/transactions
// @desc    Get all transactions for the authenticated user
// @access  Private
TransactionRouter.get('/', protect, async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Fetch all transactions for the specific user, sorted by transaction date (newest first)
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });
        // Send the transactions as a JSON response
        res.json(transactions);
    }
    catch (err) {
        console.error(err instanceof Error ? err.message : "");
        res.status(500).send('Server Error');
    }
});
// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Private
TransactionRouter.post('/', protect, async (req, res) => {
    try {
        const { amount, type, description, source, paymentMode, reference, category, date } = req.body;
        // CORRECT THE USER ID ACCESS
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const newTransaction = new Transaction({
            userId,
            amount,
            type,
            description,
            source,
            paymentMode,
            reference,
            category,
            // If client provided a date, use it; otherwise schema default applies
            ...(date ? { date: new Date(date) } : {})
        });
        const transaction = await newTransaction.save();
        res.json(transaction);
    }
    catch (err) {
        console.error(err instanceof Error ? err.message : "");
        res.status(500).send('Server Error');
    }
});
export default TransactionRouter;
