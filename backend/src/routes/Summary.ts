// src/routes/Summary.ts
import express, { Request, Response } from 'express';
import Transaction from '../models/Transaction.js';
import { protect } from './Auth.js';

const SummaryRouter = express.Router();

// @route   GET /api/summary
// @desc    Get total income and expenses for the authenticated user
// @access  Private
SummaryRouter.get('/', protect, async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const totalIncome = await Transaction.aggregate([
      { $match: { userId: userId, type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalExpenses = await Transaction.aggregate([
      { $match: { userId: userId, type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalIncome: totalIncome.length > 0 ? totalIncome[0].total : 0,
      totalExpenses: totalExpenses.length > 0 ? totalExpenses[0].total : 0
    });
  } catch (err) {
    console.error(err instanceof Error ? err.message : "");
    res.status(500).send('Server Error');
  }
});

export default SummaryRouter;