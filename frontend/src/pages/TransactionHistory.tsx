import React, { useState, useEffect } from 'react';
import TransactionTable from '../components/TransactionTable';
import FilterAndSearch from '../components/FilterAndSearch';
import SummaryCards from '../components/SummaryCards';
import type { Transaction, FilterOptions } from '../types/transaction';
import { fetchTransactions } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'


const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'all',
    amountRange: { min: 0, max: 999999 },
    paymentMode: 'all',
    searchQuery: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  useEffect(() => {
    let tempTransactions = transactions;
    if (filters.type !== 'all') {
      tempTransactions = tempTransactions.filter(t => t.type === filters.type);
    }
    tempTransactions = tempTransactions.filter(t => {
      const amount = t.debit || t.credit || 0;
      return amount >= filters.amountRange.min && amount <= filters.amountRange.max;
    });
    if (filters.paymentMode !== 'all') {
      tempTransactions = tempTransactions.filter(t => t.paymentMode === filters.paymentMode);
    }
    if (filters.searchQuery) {
      tempTransactions = tempTransactions.filter(t =>
        t.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }
    setFilteredTransactions(tempTransactions);
  }, [filters, transactions]);

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  return (
    <div className='w-screen flex justify-center'>
    <Navbar/>
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Income & Expenses</h1>
      <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
        >
          View Dashboard
        </button>
      <SummaryCards />
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <FilterAndSearch onFilterChange={handleFilterChange} />
          {/* Add Transaction Button */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 shadow-md" 
          onClick={() => navigate('/add')}>
            + Add Transaction
          </button>
        </div>
        <TransactionTable transactions={filteredTransactions} />
      </div>
    </div>
    </div>
  );
};

export default TransactionHistory;