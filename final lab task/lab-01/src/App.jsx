import React from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import StatBadge from './components/StatBadge';
import './styles.css';

function App() {
  const students = [
    {
      id: 'S101',
      name: 'Rahim Uddin',
      avatar: 'https://i.pravatar.cc/150?u=1',
      gpa: 3.8,
      major: 'Computer Science',
      courses: [{ name: 'React 101', color: '#61dafb' }, { name: 'UI/UX', color: '#ff6b6b' }]
    },
    {
      id: 'S102',
      name: 'Karim Hasan',
      avatar: 'https://i.pravatar.cc/150?u=2',
      gpa: 3.5,
      major: 'Software Engineering',
      courses: [{ name: 'Node.js', color: '#8cc84b' }, { name: 'Databases', color: '#4a90e2' }]
    },
    {
      id: 'S103',
      name: 'Sadia Rahman',
      avatar: 'https://i.pravatar.cc/150?u=3',
      gpa: 3.9,
      major: 'Data Science',
      courses: [{ name: 'Python', color: '#fdd835' }, { name: 'Machine Learning', color: '#9c27b0' }]
    },
    {
      id: 'S104',
      name: 'Arif Islam',
      avatar: 'https://i.pravatar.cc/150?u=4',
      gpa: 3.2,
      major: 'Cyber Security',
      courses: [{ name: 'Networking', color: '#607d8b' }, { name: 'Cryptography', color: '#e91e63' }]
    }
  ];

  return (
    <div className="App">
      <DashboardHeader 
        title="Student Dashboard" 
        tagline="Manage university records efficiently" 
      />
      
      <div style={{ padding: 'var(--spacing-md)' }}>
        <h2>Dashboard Overview</h2>
        <StatBadge label="Total Students" value={students.length} />
        <StatBadge label="Average GPA" value="3.6" />
      </div>

      <main className="student-grid">
        {students.map(student => (
          <StudentCard 
            key={student.id}
            id={student.id}
            name={student.name}
            avatar={student.avatar}
            gpa={student.gpa}
            major={student.major}
            courses={student.courses}
          />
        ))}
      </main>
    </div>
  );
}

export default App;