import React, { useEffect, useState } from 'react';
import DataGrid from '../components/DataGrid/DataGrid';
import Filter from '../components/Filters/Filter';
import usePagination from '../hooks/usePagination';
import useSorting from '../hooks/useSorting';
import { getUsers } from '../services/api';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from API
    getUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setUsers(data);
    //     setFilteredUsers(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching users:', error);
    //   });
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    const filteredData = users.filter((user) =>
      user.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredUsers(filteredData);
  };

  const filterOptions = [
    { value: 'name', label: 'Name' },
    { value: 'email', label: 'Email' },
    { value: 'username', label: 'Username' },
  ];

  const { currentPage, totalPages, visibleData, handlePageChange } =
    usePagination(filteredUsers, 10);
  const { sortedData, sortColumn, sortDirection, handleSort } = useSorting(
    visibleData,
    'name',
    'asc'
  );

  return (
    <div>
      <h1>Users Page</h1>
      <Filter options={filterOptions} onFilter={handleSearch} />
      <DataGrid
        data={sortedData}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'username', label: 'Username' },
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

export default UsersPage;
