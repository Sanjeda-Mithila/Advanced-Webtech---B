import React, { useState, useContext, useEffect } from 'react';
import { StudentContext } from '../context/StudentContext';

export default function AddStudentForm() {
  const { addStudent, students } = useContext(StudentContext);
  const [formData, setFormData] = useState({ name: '', id: '', major: '', gpa: '', courses: '' });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.id.trim() || isNaN(formData.id.replace(/-/g, ''))) newErrors.id = 'ID must be valid and numeric';
    if (students.some(s => s.id === formData.id)) newErrors.id = 'ID must be unique';
    if (!formData.major.trim()) newErrors.major = 'Major is required';
    if (formData.gpa < 0 || formData.gpa > 4.0 || formData.gpa === '') newErrors.gpa = 'GPA must be between 0 and 4.0';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newStudent = {
      ...formData,
      gpa: parseFloat(formData.gpa),
      avatar: `https://i.pravatar.cc/150?u=${formData.id}`,
      courses: formData.courses.split(',').map(c => ({ name: c.trim(), color: '#6366f1' })).filter(c => c.name !== '')
    };

    addStudent(newStudent);
    setFormData({ name: '', id: '', major: '', gpa: '', courses: '' });
    setErrors({});
    setSuccessMsg('Student added successfully!');
  };

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  return (
    <div className="form-container">
      <h3>Add New Student</h3>
      {successMsg && <div className="success-msg">{successMsg}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <input type="text" placeholder="Student ID (e.g., 22-48639-X)" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} />
          {errors.id && <span className="error">{errors.id}</span>}
        </div>
        <div className="form-group">
          <input type="text" placeholder="Major" value={formData.major} onChange={e => setFormData({...formData, major: e.target.value})} />
          {errors.major && <span className="error">{errors.major}</span>}
        </div>
        <div className="form-group">
          <input type="number" step="0.01" placeholder="GPA (0 - 4.0)" value={formData.gpa} onChange={e => setFormData({...formData, gpa: e.target.value})} />
          {errors.gpa && <span className="error">{errors.gpa}</span>}
        </div>
        <div className="form-group">
          <input type="text" placeholder="Courses (comma separated)" value={formData.courses} onChange={e => setFormData({...formData, courses: e.target.value})} />
        </div>
        <button type="submit" className="submit-btn">Add Student</button>
      </form>
    </div>
  );
}