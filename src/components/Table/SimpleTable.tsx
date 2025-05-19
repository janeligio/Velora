import React, { useState, useMemo } from 'react';

type TableProps<T> = {
  headers: (keyof T)[];
  data: T[];
};

export function Table<T extends { [key: string]: unknown }>({ headers, data }: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }

      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortKey, sortAsc]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return sortedData;
    return sortedData.filter((row) =>
      headers.some((key) => String(row[key]).toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [sortedData, headers, searchQuery]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={String(header)}
                  className="px-4 py-3 cursor-pointer select-none text-gray-700 font-semibold hover:bg-gray-100 transition"
                  onClick={() => handleSort(header)}
                >
                  <div className="flex items-center gap-1">
                    {String(header).toUpperCase()}
                    {sortKey === header && <span>{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-100 hover:bg-gray-50">
                {headers.map((header) => (
                  <td key={String(header)} className="px-4 py-2 text-gray-800">
                    {String(row[header])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
