import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const StudentContext = createContext();

const initialStudents = [
  { id: '22-48639-1', name: 'Rahim Uddin', avatar: 'https://i.pravatar.cc/150?u=1', gpa: 3.8, major: 'Computer Science', courses: [{ name: 'React 101', color: '#61dafb' }] },
  { id: '22-48639-2', name: 'Karim Hasan', avatar: 'https://i.pravatar.cc/150?u=2', gpa: 3.5, major: 'Software Engineering', courses: [{ name: 'Node.js', color: '#8cc84b' }] },
  { id: '22-48639-3', name: 'Sadia Rahman', avatar: 'https://i.pravatar.cc/150?u=3', gpa: 3.9, major: 'Data Science', courses: [{ name: 'Python', color: '#fdd835' }] }
];

export const StudentProvider = ({ children }) => {
  
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : initialStudents;
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortPreference, setSortPreference] = useState('default');
  const [favorites, setFavorites] = useState([]);

  
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => setStudents([...students, student]);
  
  const removeStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    setFavorites(favorites.filter(favId => favId !== id)); 
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <StudentContext.Provider value={{
      students, addStudent, removeStudent,
      searchQuery, setSearchQuery,
      sortPreference, setSortPreference,
      favorites, toggleFavorite
    }}>
      {children}
    </StudentContext.Provider>
  );
};

StudentProvider.propTypes = { children: PropTypes.node.isRequired };