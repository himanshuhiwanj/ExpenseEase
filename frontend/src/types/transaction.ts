// src/types/transaction.ts
export type TransactionType = 'expense' | 'income';
export type PaymentMode = 'online' | 'offline';

export interface Transaction {
  id: string;
  date: string;
  source: string;
  description: string;
  reference: string;
  category: string;
  debit: number | null;
  credit: number | null;
  gross: number;
  paymentMode: PaymentMode;
  type: TransactionType;
}

export interface FilterOptions {
  type: TransactionType | 'all';
  amountRange: { min: number; max: number };
  paymentMode: PaymentMode | 'all';
  searchQuery: string;
}

export type TransactionPayload = {
  amount: number;
  type: 'income' | 'expense';
  description: string;
  source: string;
  reference: string;
  paymentMode: 'online' | 'offline'; // Add this line
  category: string;
  gross: number;
  date?: string; // ISO date string (yyyy-mm-dd or full ISO)
};

