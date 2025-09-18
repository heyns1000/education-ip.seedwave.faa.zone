import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Courses } from './components/Courses';
import { Assignments } from './components/Assignments';
import { Grades } from './components/Grades';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'assignments':
        return <Assignments />;
      case 'grades':
        return <Grades />;
      case 'calendar':
        return <div className="p-6 bg-white rounded-lg">Calendar feature coming soon...</div>;
      case 'discussions':
        return <div className="p-6 bg-white rounded-lg">Discussions feature coming soon...</div>;
      case 'classmates':
        return <div className="p-6 bg-white rounded-lg">Classmates feature coming soon...</div>;
      case 'settings':
        return <div className="p-6 bg-white rounded-lg">Settings feature coming soon...</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderContent()}
    </Layout>
  );
}

export default App;