import React from 'react';
import PropTypes from 'prop-types';
import CourseTag from './CourseTag';
import StatBadge from './StatBadge';

export default function StudentCard({ name, id, avatar, gpa, major, courses }) {
  return (
    <div className="student-card">
      <img src={avatar} alt={`${name}'s avatar`} width="60" style={{ borderRadius: '50%' }} />
      <h3>{name}</h3>
      <p style={{ color: 'var(--text-muted)' }}>ID: {id}</p>
      
      <div style={{ marginBottom: '10px' }}>
        <StatBadge label="Major" value={major} />
        <StatBadge label="GPA" value={gpa} />
      </div>

      <div>
        <strong>Courses: </strong>
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
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};