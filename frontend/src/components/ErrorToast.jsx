import React from 'react';

const ErrorToast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
      {message}
      <button onClick={onClose} className="ml-4 font-bold hover:text-gray-200">
        ×
      </button>
    </div>
  );
};

export default ErrorToast;