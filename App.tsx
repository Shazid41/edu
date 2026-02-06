
import React, { useState, useEffect } from 'react';
import { Student, ViewType } from './types';
import { INITIAL_STUDENTS } from './constants';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import AIInsights from './components/AIInsights';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load data from localStorage or use initial data
    const saved = localStorage.getItem('eduPulse_students');
    if (saved) {
      setStudents(JSON.parse(saved));
    } else {
      setStudents(INITIAL_STUDENTS);
      localStorage.setItem('eduPulse_students', JSON.stringify(INITIAL_STUDENTS));
    }
    setIsLoaded(true);
  }, []);

  const handleAddStudent = () => {
    // Placeholder for add student functionality
    alert("This feature would open a detailed student registration form.");
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard students={students} />;
      case 'students':
        return <StudentList students={students} onAddStudent={handleAddStudent} />;
      case 'ai-insights':
        return <AIInsights students={students} />;
      case 'grades':
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Grade Management</h2>
            <p className="text-slate-500">Feature coming soon in version 2.0</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Attendance Tracking</h2>
            <p className="text-slate-500">Real-time attendance logs are being integrated.</p>
          </div>
        );
      default:
        return <Dashboard students={students} />;
    }
  };

  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout activeView={view} setActiveView={setView}>
      {renderView()}
    </Layout>
  );
};

export default App;
