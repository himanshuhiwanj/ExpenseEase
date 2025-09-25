import React from "react";

interface DownloadButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  error?: string | null;
  text?: string;
}
const DownloadButton: React.FC<DownloadButtonProps> = ({ onClick, loading, error, text = 'Download Report' }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold text-lg
          bg-purple-600 hover:bg-purple-700 transition duration-300 text-white
          ${loading ? 'bg-purple-400 cursor-not-allowed' : ''}
        `}
        disabled={loading}
      >
        {loading ? 'Generating...' : text}
      </button>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6 rounded-md">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
