import React from 'react';
import type { FilterOptions, TransactionType, PaymentMode } from '../types/transaction';
import { FaSearch } from 'react-icons/fa'; // You'll need to install react-icons

interface FilterAndSearchProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({ onFilterChange }) => {
  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2 w-full">
      <div className="flex space-x-2">
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onFilterChange({ type: e.target.value as TransactionType | 'all' })}
        >
          <option value="all">All Types</option>
          <option value="expense">Expenses</option>
          <option value="income">Income</option>
        </select>
        <select
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onFilterChange({ paymentMode: e.target.value as PaymentMode | 'all' })}
        >
          <option value="all">All Modes</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search transaction"
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default FilterAndSearch;