import React from 'react';
import PropTypes from 'prop-types';

export default function DashboardHeader({ title, tagline }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>{tagline}</p>
      </div>
      <nav>
        <a href="#home" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</a>
        <a href="#students" style={{ color: 'white', textDecoration: 'none' }}>Students</a>
      </nav>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};