import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className='pagination'>
      <button
        className='pagination__button'
        disabled={currentPage === 1}
        onClick={handlePreviousClick}
      >
        Previous
      </button>
      <span className='pagination__text'>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className='pagination__button'
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
