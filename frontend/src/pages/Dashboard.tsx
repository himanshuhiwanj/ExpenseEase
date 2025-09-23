import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SummaryCards from '../components/SummaryCards';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const DashboardPage = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState({
    expenseByCategory: {
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }],
    },
    incomeVsExpense: {
      labels: [],
      datasets: [{ label: '', data: [] }],
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:3000/api/dashboard', config);
        const { incomeVsExpense, expenseByCategory } = res.data;

        // Assign colors for the doughnut chart
        const colors = [
          '#4299e1', '#f6ad55', '#48bb78', '#f56565', '#9f7aea', '#ecc94b',
          '#6a3b63', '#a74a81', '#cf87a2', '#e1a7ba', '#a3a3a3', '#666666', '#333333'
        ];
        const doughnutData = {
          labels: expenseByCategory.labels,
          datasets: [{
            data: expenseByCategory.datasets[0].data,
            backgroundColor: colors.slice(0, expenseByCategory.labels.length),
            hoverBackgroundColor: colors.slice(0, expenseByCategory.labels.length).map(c => c + 'a0'),
          }],
        };

        // Format data for the bar chart
        const barData = {
          labels: incomeVsExpense.labels,
          datasets: [{
            label: 'Total Amount',
            data: incomeVsExpense.datasets[0].data,
            backgroundColor: ['#48bb78', '#f56565'],
            borderColor: ['#38a169', '#e53e3e'],
            borderWidth: 1,
          }],
        };

        setChartData({
          expenseByCategory: doughnutData,
          incomeVsExpense: barData,
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        // You can keep a minimal fallback or an error message here
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className='flex justify-center items-center w-screen'>
      
      <Navbar/> 
    <div className="p-8  bg-gray-100 min-h-screen">
    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
    <SummaryCards/>
      <div className="py-4 flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/history')}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 shadow-md"
        >
          View Transactions
        </button>

        <button
          onClick={() => navigate('/add')}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300 shadow-md"
        >
          Add Transactions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Expenses by Category</h2>
          <div className="w-full max-w-sm">
            <Doughnut data={chartData.expenseByCategory} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Income vs. Expenses</h2>
          <div className="w-full max-w-sm">
            <Bar
              data={chartData.incomeVsExpense}
              options={{
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: true, text: 'Total Income vs. Expenses' } }
              }}
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardPage;
