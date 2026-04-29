import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';
import { StudentContext } from '../context/StudentContext';

export default function StudentCard({ id, name, avatar, gpa, major, courses }) {
  const { favorites, toggleFavorite, removeStudent } = useContext(StudentContext);
  const isFavorite = favorites.includes(id);

  return (
    <div className="student-card">
      <div className="card-header">
        <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
        <button className={`fav-btn ${isFavorite ? 'active' : ''}`} onClick={() => toggleFavorite(id)}>
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
        {courses.map((course, index) => <CourseTag key={index} courseName={course.name} color={course.color} />)}
      </div>
      <button className="remove-btn" onClick={() => removeStudent(id)}>Remove Student</button>
    </div>
  );
}

StudentCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  gpa: PropTypes.number.isRequired,
  major: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
};