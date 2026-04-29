import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../context/ThemeContext';
import { StudentContext } from '../context/StudentContext';

export default function DashboardHeader({ title, tagline }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { favorites } = useContext(StudentContext);

  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>
        <p>{tagline}</p>
      </div>
      <nav className="nav-links">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
        <span className="fav-badge">Favorites: {favorites.length}</span>
      </nav>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};