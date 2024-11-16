"use client";
import React from 'react';

const Button = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <div>
      <button
        onClick={handleBack}
        className="py-3 px-6 rounded text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-orange-800/80 font-medium rounded-lg text-sm text-center me-1 mb-2"
      >
        <span className="flex items-center justify-center">
          <svg
            className="h-6 w-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19L3 12m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver
        </span>
      </button>
    </div>
  );
};

export default Button;

