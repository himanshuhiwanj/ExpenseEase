// src/components/TransactionTable.tsx
import React from 'react';
import type { Transaction } from '../types/transaction';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map(t => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.source}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.reference}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{t.debit !== null ? `$${t.debit.toFixed(2)}` : '-'}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{t.credit !== null ? `$${t.credit.toFixed(2)}` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;