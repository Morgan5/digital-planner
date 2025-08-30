import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Agenda from './components/Agenda';
import TodoList from './components/TodoList';
import Notes from './components/Notes';
import Guides from './components/Guides';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!user?.isAuthenticated) {
    return <Login />;
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'agenda':
        return <Agenda />;
      case 'todo':
        return <TodoList />;
      case 'notes':
        return <Notes />;
      case 'guides':
        return <Guides />;
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderSection()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;