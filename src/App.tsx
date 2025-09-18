import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Symptoms } from './components/Symptoms';
import { Medications } from './components/Medications';
import { PeakFlow } from './components/PeakFlow';
import { Education } from './components/Education';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'symptoms':
        return <Symptoms />;
      case 'medications':
        return <Medications />;
      case 'peakflow':
        return <PeakFlow />;
      case 'education':
        return <Education />;
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