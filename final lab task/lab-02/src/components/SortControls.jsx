import React from 'react';
import PropTypes from 'prop-types';

export default function SortControls({ sortPreference, onSortChange }) {
  return (
    <div className="sort-controls">
      <span className="sort-label">Sort By:</span>
      <button 
        className={`sort-btn ${sortPreference === 'default' ? 'active' : ''}`}
        onClick={() => onSortChange('default')}
      >Default</button>
      <button 
        className={`sort-btn ${sortPreference === 'name' ? 'active' : ''}`}
        onClick={() => onSortChange('name')}
      >Name (A-Z)</button>
      <button 
        className={`sort-btn ${sortPreference === 'gpa' ? 'active' : ''}`}
        onClick={() => onSortChange('gpa')}
      >GPA</button>
    </div>
  );
}
SortControls.propTypes = {
  sortPreference: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};