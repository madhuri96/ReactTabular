import { useState, useEffect } from 'react';

const useSorting = (data, initialSortColumn, initialSortDirection) => {
  const [sortedData, setSortedData] = useState([...data]);
  const [sortColumn, setSortColumn] = useState(initialSortColumn);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
    setSortedData(sorted);
  }, [data, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return { sortedData, sortColumn, sortDirection, handleSort };
};

export default useSorting;
