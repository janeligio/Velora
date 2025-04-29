import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
