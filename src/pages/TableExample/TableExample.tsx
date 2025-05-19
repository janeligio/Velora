import React from 'react';
import { Table } from '../../components/Table/Table'; // adjust path if Table is located elsewhere
import MainLayout from '../../layouts/MainLayout/MainLayout';

type User = {
  name: string;
  age: number;
  email: string;
};

const sampleData: User[] = [
  { name: 'Alice', age: 30, email: 'alice@example.com' },
  { name: 'Bob', age: 25, email: 'bob@example.com' },
  { name: 'Charlie', age: 35, email: 'charlie@example.com' },
];

const headers: (keyof User)[] = ['name', 'age', 'email'] as const;

const TableExample: React.FC = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">User Table</h1>
        <Table headers={headers} data={sampleData} resizable columnWidths={{ name: '500px' }} />
      </div>
    </MainLayout>
  );
};

export default TableExample;
