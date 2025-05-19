import React, { useState, useMemo, useRef, useEffect } from 'react';

type TableProps<T> = {
  headers: (keyof T)[];
  data: T[];
  resizable?: boolean;
  columnWidths?: Partial<Record<keyof T, string>>;
};

export function Table<T extends { [key: string]: unknown }>({
  headers,
  data,
  resizable,
  columnWidths,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  // Helper function to measure text width using canvas
  const measureTextWidth = (text: string, font = '14px Arial') => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return 0;
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };

  // Initialize column widths from localStorage or default to 150px
  const [internalWidths, setInternalWidths] = useState<Record<string, number>>(() => {
    if (!resizable) return {};
    try {
      const stored = localStorage.getItem('table-column-widths');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed;
        }
      }
    } catch {
      // ignore errors
    }
    const initialWidths: Record<string, number> = {};
    headers.forEach((h) => {
      initialWidths[String(h)] = 150;
    });
    return initialWidths;
  });

  // Persist column widths to localStorage whenever they change
  useEffect(() => {
    if (!resizable) return;
    localStorage.setItem('table-column-widths', JSON.stringify(internalWidths));
  }, [internalWidths, resizable]);

  // Refs for tracking resizing state
  const resizingColRef = useRef<string | null>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  // Minimum and maximum width limits
  const MIN_WIDTH = 50;
  const MAX_WIDTH = 600;

  // Mouse move handler for resizing
  const onMouseMove = (e: MouseEvent) => {
    if (!resizable) return;
    if (!resizingColRef.current) return;
    e.preventDefault();
    const deltaX = e.clientX - startXRef.current;
    setInternalWidths((prevWidths) => {
      const col = resizingColRef.current!;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthRef.current + deltaX));
      if (prevWidths[col] === newWidth) return prevWidths;
      return { ...prevWidths, [col]: newWidth };
    });
  };

  // Mouse up handler to stop resizing
  const onMouseUp = () => {
    if (!resizable) return;
    if (resizingColRef.current) {
      resizingColRef.current = null;
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
  };

  // Start resizing handler
  const onResizeMouseDown = (e: React.MouseEvent, col: string) => {
    if (!resizable) return;
    e.preventDefault();
    resizingColRef.current = col;
    startXRef.current = e.clientX;
    startWidthRef.current = internalWidths[col] ?? 150;
    document.body.style.userSelect = 'none';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Auto-fit column width on double click
  const onResizeDoubleClick = (colKey: keyof T) => {
    if (!resizable) return;
    const col = String(colKey);
    // Measure header text width
    const headerText = col.toUpperCase();
    const headerWidth = measureTextWidth(headerText, 'bold 14px Arial') + 32; // extra padding

    // Measure max cell content width for this column
    let maxCellWidth = 0;
    for (const row of data) {
      const cellText = String(row[colKey] ?? '');
      const cellWidth = measureTextWidth(cellText) + 32; // extra padding
      if (cellWidth > maxCellWidth) maxCellWidth = cellWidth;
    }

    const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.max(headerWidth, maxCellWidth)));

    setInternalWidths((prev) => ({ ...prev, [col]: newWidth }));
  };

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
        <table className="min-w-full text-sm text-left" style={{ tableLayout: 'fixed' }}>
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => {
                const col = String(header);
                const userWidth = columnWidths?.[header];
                const width = userWidth
                  ? userWidth
                  : resizable
                  ? internalWidths[col] ?? 150
                  : undefined;
                const isUserDefinedWidth = !!userWidth;
                return (
                  <th
                    key={col}
                    className="px-4 py-3 cursor-pointer select-none text-gray-700 font-semibold hover:bg-gray-100 transition relative"
                    onClick={() => handleSort(header)}
                    style={
                      userWidth
                        ? { width: userWidth, minWidth: userWidth, maxWidth: userWidth }
                        : resizable
                        ? {
                            width,
                            minWidth: width,
                            maxWidth: width,
                            userSelect: resizingColRef.current === col ? 'none' : undefined,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1 select-none">
                      {col.toUpperCase()}
                      {sortKey === header && <span>{sortAsc ? '▲' : '▼'}</span>}
                    </div>
                    {/* Resizer */}
                    {resizable && !isUserDefinedWidth && (
                      <div
                        onMouseDown={(e) => onResizeMouseDown(e, col)}
                        onDoubleClick={() => onResizeDoubleClick(header)}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          height: '100%',
                          width: '8px',
                          cursor: 'col-resize',
                          userSelect: 'none',
                          zIndex: 10,
                        }}
                        role="separator"
                        aria-orientation="vertical"
                        aria-valuenow={typeof width === 'number' ? width : undefined}
                        aria-valuemin={MIN_WIDTH}
                        aria-valuemax={MAX_WIDTH}
                        tabIndex={-1}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-100 hover:bg-gray-50">
                {headers.map((header) => {
                  const col = String(header);
                  const userWidth = columnWidths?.[header];
                  const width = userWidth
                    ? userWidth
                    : resizable
                    ? internalWidths[col] ?? 150
                    : undefined;
                  return (
                    <td
                      key={col}
                      className="px-4 py-2 text-gray-800"
                      style={
                        userWidth
                          ? {
                              width: userWidth,
                              minWidth: userWidth,
                              maxWidth: userWidth,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }
                          : resizable
                          ? {
                              width,
                              minWidth: width,
                              maxWidth: width,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }
                          : undefined
                      }
                    >
                      {String(row[header])}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
