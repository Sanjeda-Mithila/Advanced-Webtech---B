import React from 'react';
import PropTypes from 'prop-types';

export default function DashboardHeader({ title, tagline, favoriteCount }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>
      <nav className="nav-links">
        <span className="fav-badge">
          Favorites: {favoriteCount}
        </span>
        <a href="#home">Home</a>
        <a href="#students">Students</a>
      </nav>
    </header>
  );
}
DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  favoriteCount: PropTypes.number.isRequired,
};