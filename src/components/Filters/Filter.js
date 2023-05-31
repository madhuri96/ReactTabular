import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Filter = ({ options, onFilter }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className='filter'>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value=''>All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

Filter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
