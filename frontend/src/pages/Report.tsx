import { useState } from 'react';
import { downloadReportPdf } from '../services/apiService';
import Navbar from '../components/Navbar'

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle the download button click.
  const handleDownloadReport = async () => {
    setLoading(true);
    setError(null);

    try {
      await downloadReportPdf();
    } catch (err) {
      console.error('Download error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-screen flex justify-center'>
        <Navbar/>
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4'>
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-purple-600">
          Financial Report Generator
        </h1>
        <p className="text-gray-600 mb-8">
          Click the button below to generate and download your latest financial report in PDF format.
        </p>
        
        <button
          onClick={handleDownloadReport}
          className={`
            w-full py-4 px-6 rounded-lg font-semibold text-lg
            bg-purple-600 hover:bg-purple-700 transition duration-300 text-white
            ${loading ? 'bg-purple-400 cursor-not-allowed' : ''}
          `}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Download Report'}
        </button>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6 rounded-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Report;
