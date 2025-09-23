// src/services/apiService.ts
import  type {Transaction , TransactionPayload}  from '../types/transaction';
import axios from 'axios';



const API = axios.create({
  baseURL: 'http://localhost:3000/api', // or your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// GET request to fetch all transactions
export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await API.get('http://localhost:3000/api/transactions');
    const apiItems = response.data as any[];

    // Map backend shape { _id, amount, type, description, source, paymentMode, reference, date }
    // to frontend Transaction shape { id, date, source, description, reference, debit, credit, gross, paymentMode, type }
    const mapped: Transaction[] = (apiItems || []).map(item => {
      const amount: number = Number(item?.amount ?? 0);
      const isExpense = item?.type === 'expense';
      return {
        id: String(item?._id ?? item?.id ?? cryptoRandomId()),
        date: String(item?.date ?? ''),
        source: String(item?.source ?? ''),
        description: String(item?.description ?? ''),
        reference: String(item?.reference ?? ''),
        category: String(item?.category ?? ''),
        debit: isExpense ? amount : null,
        credit: !isExpense ? amount : null,
        gross: isExpense ? -amount : amount,
        paymentMode: (item?.paymentMode === 'offline' ? 'offline' : 'online'),
        type: isExpense ? 'expense' : 'income',
      };
    });

    return mapped;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching transactions:', error.response?.data);
      throw error.response?.data || new Error('An unknown error occurred');
    } else {
      console.error('An unexpected error occurred:', error);
      throw new Error('An unknown error occurred');
    }
  }
};

// Minimal random id fallback when backend id is missing
function cryptoRandomId(): string {
  try {
    return (crypto as any).randomUUID?.() ?? Math.random().toString(36).slice(2);
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

// src/services/apiService.ts


// The URL of your backend server


export const addTransaction = async (transactionData : TransactionPayload) => {
  try {
  const response = await API.post('http://localhost:3000/api/transactions', transactionData);
  return response.data;
} catch (error) {   
  // Check if the error is an AxiosError using a type guard
  if (axios.isAxiosError(error)) {
    // If it is, you can safely access error.response
    console.error('Error adding transaction:', error.response?.data);
    throw error.response?.data || new Error('An unknown error occurred');
  } else {
    // If not, it's a generic error
    console.error('An unexpected error occurred:', error);
    throw new Error('An unknown error occurred');
  }
}
};

// Download PDF report of all transactions
export const downloadReportPdf = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/report', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) {
    throw new Error('Failed to generate report');
  }
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'transactions_report.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};