import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ChatInterface } from './components/chat/ChatInterface';
import { InsightDashboard } from './components/insight/InsightDashboard';
import { ProfileView } from './components/profile/ProfileView';
import { ForumView } from './components/forum/ForumView';

type View = 'search' | 'insight' | 'profile' | 'forum';

function App() {
  const [currentView, setCurrentView] = useState<View>('search');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'insight':
        return <InsightDashboard />;
      case 'profile':
        return <ProfileView />;
      case 'forum':
        return <ForumView />;
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar
        isMinimized={isMinimized}
        isDarkMode={isDarkMode}
        currentView={currentView}
        onViewChange={setCurrentView}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onLogout={handleLogout}
      />
      <main className={`flex-1 overflow-auto transition-all ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;