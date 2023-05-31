import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const DataGrid = ({ data, columns }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchWord, setSearchWord] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Function to handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle changing the page size
  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(1);
  };

  // Function to handle search
  const handleSearch = (event) => {
    setSearchWord(event.target.value);
    setCurrentPage(1);
  };

  // Function to handle sorting
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Apply filtering, sorting, and pagination to the data
  let filteredData = data;
  if (searchWord) {
    filteredData = filteredData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchWord.toLowerCase())
      )
    );
  }

  if (sortColumn) {
    filteredData.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      return sortDirection === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });
  }

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleData = filteredData.slice(startIndex, startIndex + pageSize);

  return (
    <div className='data-grid'>
      <div className='data-grid__controls'>
        <input
          type='text'
          placeholder='Search...'
          value={searchWord}
          onChange={handleSearch}
        />
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} onClick={() => handleSort(column.key)}>
                {column.label}
                {sortColumn === column.key && (
                  <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key}>{item[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='data-grid__pagination'>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

DataGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default DataGrid;
