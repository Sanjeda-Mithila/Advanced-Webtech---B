import React from 'react';
import PropTypes from 'prop-types';

export default function StatBadge({ label, value }) {
  return (
    <div className="stat-badge">
      <span>{label}: </span>
      <span>{value}</span>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};