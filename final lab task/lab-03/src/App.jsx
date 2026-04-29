import React, { useContext } from 'react';
import DashboardHeader from './components/DashboardHeader';
import StudentCard from './components/StudentCard';
import StatBadge from './components/StatBadge';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import AddStudentForm from './components/AddStudentForm';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider, StudentContext } from './context/StudentContext';
import './styles.css';


function DashboardContent() {
  const { students, searchQuery, sortPreference, setSearchQuery, setSortPreference } = useContext(StudentContext);

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

  return (
    <>
      <DashboardHeader title="Student Dashboard" tagline="Manage university records efficiently" />
      <div className="container">
        <AddStudentForm />

        <div className="overview-section">
          <h2>Dashboard Overview</h2>
          <StatBadge label="Total Displayed" value={filteredAndSortedStudents.length} />
        </div>

        <div className="controls-container">
          <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          <SortControls sortPreference={sortPreference} onSortChange={setSortPreference} />
        </div>

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
              />
            ))
          ) : (
            <p style={{ textAlign: 'center', width: '100%', color: 'var(--text-muted)' }}>No students found.</p>
          )}
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <div className="App">
          <DashboardContent />
        </div>
      </StudentProvider>
    </ThemeProvider>
  );
}

export default App;