import React from 'react';
import { Link } from 'react-router';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">Page Not Found</p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
