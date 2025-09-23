// src/components/SummaryCards.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Summary {
  totalIncome: number;
  totalExpenses: number;
}

const SummaryCards: React.FC = () => {
  const [summary, setSummary] = useState<Summary>({ totalIncome: 0, totalExpenses: 0 });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:3000/api/summary', config);
        setSummary(res.data);
      } catch (err) {
        console.error("Error fetching summary data:", err);
      }
    };
    fetchSummary();
  }, []);

  const balance = summary.totalIncome - summary.totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-500">Total Income</h3>
          <p className="text-3xl font-bold text-green-500">
            ${summary.totalIncome.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-500">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-500">
            ${summary.totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <div>
          <h3 className="text-xl font-medium text-gray-500">Balance</h3>
          <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;