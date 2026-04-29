import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';

export default function StudentCard({ name, id, avatar, gpa, major, courses, onToggleFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    onToggleFavorite(newState);
  };

  return (
    <div className="student-card">
      <div className="card-header">
        <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
        <button 
          className={`fav-btn ${isFavorite ? 'active' : ''}`} 
          onClick={handleFavoriteClick}
          title="Toggle Favorite"
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      
      <div className="student-info">
        <h3>{name}</h3>
        <p className="student-id">ID: {id}</p>
      </div>
      
      <div className="stats-row">
        <StatBadge label="Major" value={major} />
        <StatBadge label="GPA" value={gpa} />
      </div>

      <div className="courses-section">
        <span className="courses-title">Enrolled Courses</span>
        {courses.map((course, index) => (
          <CourseTag key={index} courseName={course.name} color={course.color} />
        ))}
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};