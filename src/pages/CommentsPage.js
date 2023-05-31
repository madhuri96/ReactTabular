import React, { useEffect, useState } from 'react';
import DataGrid from '../components/DataGrid/DataGrid';
import Filter from '../components/Filters/Filter';
import usePagination from '../hooks/usePagination';
import useSorting from '../hooks/useSorting';
import { getComments } from '../services/api';

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredComments, setFilteredComments] = useState([]);

  useEffect(() => {
    // Fetch comments data from API
    getComments()
      .then((data) => {
        setComments(data);
        setFilteredComments(data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
    // fetch('https://jsonplaceholder.typicode.com/comments')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setComments(data);
    //     setFilteredComments(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching comments:', error);
    //   });
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    const filteredData = comments.filter((comment) =>
      comment.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredComments(filteredData);
  };

  const filterOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'body', label: 'Body' },
  ];

  const { currentPage, totalPages, visibleData, handlePageChange } =
    usePagination(filteredComments, 10);
  const { sortedData, sortColumn, sortDirection, handleSort } = useSorting(
    visibleData,
    'name',
    'asc'
  );

  return (
    <div>
      <h1>Comments Page</h1>
      <Filter options={filterOptions} onFilter={handleSearch} />
      <DataGrid
        data={sortedData}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'body', label: 'Body' },
        ]}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
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

export default CommentsPage;
