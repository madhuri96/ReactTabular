import React, { useEffect, useState } from 'react';
import DataGrid from '../components/DataGrid/DataGrid';
import Filter from '../components/Filters/Filter';
import usePagination from '../hooks/usePagination';
import useSorting from '../hooks/useSorting';
import { getPosts } from '../services/api';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    // Fetch posts data from API
    getPosts()
      .then((data) => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPosts(data);
    //     setFilteredPosts(data);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching posts:', error);
    //   });
  }, []);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    const filteredData = posts.filter((post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredPosts(filteredData);
  };

  const filterOptions = [
    { value: 'title', label: 'Title' },
    { value: 'body', label: 'Body' },
  ];

  const { currentPage, totalPages, visibleData, handlePageChange } =
    usePagination(filteredPosts, 10);
  const { sortedData, sortColumn, sortDirection, handleSort } = useSorting(
    visibleData,
    'title',
    'asc'
  );

  return (
    <div>
      <h1>Posts Page</h1>
      <Filter options={filterOptions} onFilter={handleSearch} />
      <DataGrid
        data={sortedData}
        columns={[
          { key: 'title', label: 'Title' },
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

export default PostsPage;
