import React, { useState } from 'react';
import type { PaymentMode, TransactionType, TransactionPayload } from '../types/transaction';
import { addTransaction } from '../services/apiService'; // Import the new service
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

// A simple utility type for the form data
type FormData = {
  amount: number | '';
  type: TransactionType;
  paymentMode: PaymentMode;
  description: string;
  source: string;
  reference: string;
  category: string;
  date: string; // yyyy-mm-dd
};

const AddTransaction: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    amount: '',
    type: 'expense',
    paymentMode: 'online',
    description: '',
    source: '',
    reference: '',
    category: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(null);
  setError(null);
  console.log("Step 1")
  // Check if amount is an empty string
  if (formData.amount === '' || !formData.description || !formData.source || !formData.category || !formData.date) {
    setError('Please fill in all required fields: Amount, Description, Source, Category, and Date.');
    setLoading(false);
    return;
  }
  console.log("Creating Payload")
  // Create a new object that conforms to the TransactionPayload type
  const payload: TransactionPayload = {
    amount: formData.amount, // Now this will be a number because of the check above
    type: formData.type,
    paymentMode: formData.paymentMode,
    description: formData.description,
    source: formData.source,
    reference: formData.reference,
    category: formData.category,
    gross: formData.type === 'expense' ? -formData.amount : formData.amount,
    // send ISO date string; backend will coerce to Date
    date: formData.date,
  };
  console.log("Created Payload")
  try {
    console.log("Adding Transaction")
    await addTransaction(payload);
    console.log("Added Transaction")
    setSuccess('Transaction added successfully!');
    setFormData({
      amount: '',
      type: 'expense',
      paymentMode: 'online',
      description: '',
      source: '',
      reference: '',
      category: '',
      date: '',
    });
  } catch (err) {
    setError('Failed to add transaction. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='w-screen flex justify-center'>
      <Navbar/>
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      
        
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add New Transaction</h1>
        <div className='flex justify-between'>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
        >
          View Dashboard
        </button>

        <button
          onClick={() => navigate('/history')}
          className="bg-red-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-red-600 transition duration-300 shadow-md"
        >
          View Transactions
        </button>
      </div>
        {success && <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">{success}</div>}
        {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount and Type Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
          </div>

          {/* Description and Payment Mode Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <select
                id="paymentMode"
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          {/* Source and Category Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <input
                type="text"
                id="source"
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {formData.type === 'expense' ? (
                  <>
                    <option value="">Select a category</option>
                    <option value="Food & Grocery">Food & Grocery</option>
                    <option value="Housing / Rent / Utilities">Housing / Rent / Utilities</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Entertainment & Leisure">Entertainment & Leisure</option>
                    <option value="Shopping / Personal Care">Shopping / Personal Care</option>
                    <option value="Education">Education</option>
                    <option value="Finance / Investments / Loans">Finance / Investments / Loans</option>
                    <option value="Subscriptions / Memberships">Subscriptions / Memberships</option>
                    <option value="Travel / Vacation">Travel / Vacation</option>
                    <option value="Gifts / Donations">Gifts / Donations</option>
                    <option value="Taxes / Government Payments">Taxes / Government Payments</option>
                    <option value="Savings / Emergency Fund">Savings / Emergency Fund</option>
                    <option value="Other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="">Select a category</option>
                    <option value="Salary / Wages">Salary / Wages</option>
                    <option value="Freelance / Side Income">Freelance / Side Income</option>
                    <option value="Business Income">Business Income</option>
                    <option value="Gifts / Bonus">Gifts / Bonus</option>
                    <option value="Other">Other</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Reference Field */}
          <div>
            <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={formData.reference}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Field */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white p-3 rounded-md font-semibold hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-400"
          >
            {loading ? 'Adding...' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddTransaction;