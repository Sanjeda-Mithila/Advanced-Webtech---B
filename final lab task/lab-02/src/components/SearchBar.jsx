import React from 'react';
import PropTypes from 'prop-types';

export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name or major..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};