import express from 'express';
import Goal from '../models/goal.js';
import { protect } from './Auth.js';
const GoalRouter = express.Router();
// @route   POST /api/goals
// @desc    Add a new savings goal
// @access  Private
GoalRouter.post('/', protect, async (req, res) => {
    try {
        const { name, targetAmount, description } = req.body;
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const newGoal = new Goal({
            userId,
            name,
            targetAmount,
            description,
        });
        const goal = await newGoal.save();
        res.status(201).json(goal);
    }
    catch (err) {
        console.error(err instanceof Error ? err.message : "");
        res.status(500).send('Server Error');
    }
});
// @route   GET /api/goals
// @desc    Get all savings goals for the user
// @access  Private
GoalRouter.get('/', protect, async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const goals = await Goal.find({ userId }).sort({ date: -1 });
        res.json(goals);
    }
    catch (err) {
        console.error(err instanceof Error ? err.message : "");
        res.status(500).send('Server Error');
    }
});
export default GoalRouter;
