import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    enum: [
      // Expense Categories
      'Food & Grocery',
      'Housing / Rent / Utilities',
      'Transportation',
      'Health & Fitness',
      'Entertainment & Leisure',
      'Shopping / Personal Care',
      'Education',
      'Finance / Investments / Loans',
      'Subscriptions / Memberships',
      'Travel / Vacation',
      'Gifts / Donations',
      'Taxes / Government Payments',
      'Savings / Emergency Fund',
      // Income Categories
      'Salary / Wages',
      'Freelance / Side Income',
      'Business Income',
      'Gifts / Bonus',
      'Other'
    ],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  paymentMode: {
    type: String,
    enum: ['online', 'offline'],
    required: true
  },
  reference: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;