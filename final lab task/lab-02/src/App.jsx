import React, { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import StatBadge from './components/StatBadge';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import './styles.css';


const mockStudentData = [
  { id: '22-48639-1', name: 'Rahim Uddin', avatar: 'https://i.pravatar.cc/150?u=1', gpa: 3.8, major: 'Computer Science', courses: [{ name: 'React 101', color: '#61dafb' }] },
  { id: '22-48639-2', name: 'Karim Hasan', avatar: 'https://i.pravatar.cc/150?u=2', gpa: 3.5, major: 'Software Engineering', courses: [{ name: 'Node.js', color: '#8cc84b' }] },
  { id: '22-48639-3', name: 'Sadia Rahman', avatar: 'https://i.pravatar.cc/150?u=3', gpa: 3.9, major: 'Data Science', courses: [{ name: 'Python', color: '#fdd835' }] },
  { id: '22-48640-3', name: 'Arif Islam', avatar: 'https://i.pravatar.cc/150?u=4', gpa: 3.2, major: 'Cyber Security', courses: [{ name: 'Networking', color: '#607d8b' }] }
];

function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortPreference, setSortPreference] = useState('default');
  const [favoriteCount, setFavoriteCount] = useState(0);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setStudents(mockStudentData);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer); 
  }, []);


  const filteredAndSortedStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortPreference === 'name') return a.name.localeCompare(b.name);
      if (sortPreference === 'gpa') return b.gpa - a.gpa;
      return 0; 
    });

 
  useEffect(() => {
    document.title = `Dashboard - ${filteredAndSortedStudents.length} Students`;
  }, [filteredAndSortedStudents.length]);

  const handleToggleFavorite = (isAdding) => {
    setFavoriteCount(prevCount => isAdding ? prevCount + 1 : prevCount - 1);
  };

  return (
    <div className="App">
      <DashboardHeader 
        title="Student Dashboard" 
        tagline="Manage university records efficiently"
        favoriteCount={favoriteCount} 
      />
      
      <div className="container">
        <div className="overview-section">
          <h2>Dashboard Overview</h2>
          <StatBadge label="Total Displayed" value={filteredAndSortedStudents.length} />
        </div>

        <div className="controls-container">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <SortControls sortPreference={sortPreference} onSortChange={setSortPreference} />
        </div>

        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <main className="student-grid">
            {filteredAndSortedStudents.length > 0 ? (
              filteredAndSortedStudents.map(student => (
                <StudentCard 
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  avatar={student.avatar}
                  gpa={student.gpa}
                  major={student.major}
                  courses={student.courses}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>
                No students found matching your criteria.
              </p>
            )}
          </main>
        )}
      </div>
    </div>
  );
}

export default App;