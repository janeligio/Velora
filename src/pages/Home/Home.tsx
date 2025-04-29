import React from 'react';
import MainLayout from '../../layouts/MainLayout/MainLayout';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">Welcome to Velora</h1>
        <p className="text-lg text-gray-700">This is the home page.</p>
      </div>
    </MainLayout>
  );
};

export default Home;
