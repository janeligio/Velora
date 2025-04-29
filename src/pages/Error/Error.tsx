import React from 'react';
import { Link } from 'react-router';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const ErrorPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold mb-4 text-red-600">Something went wrong</h1>
        <p className="text-lg text-gray-700 mb-6">
          Please try refreshing the page or come back later.
        </p>
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;
