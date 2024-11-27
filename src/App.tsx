import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ChatInterface } from './components/chat/ChatInterface';
import { InsightDashboard } from './components/insight/InsightDashboard';
import { ProfileHeader } from './components/profile/ProfileHeader';
import { ProfileStats } from './components/profile/ProfileStats';
import { ProfileMenu } from './components/profile/ProfileMenu';

type View = 'chat' | 'insight' | 'profile';

function App() {
  const [currentView, setCurrentView] = useState<View>('insight');

  const mockProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Developer',
    joinDate: new Date('2024-01-01'),
  };

  const mockStats = {
    projects: 12,
    completedTasks: 148,
    activeCollaborations: 5,
  };

  const renderContent = () => {
    switch (currentView) {
      case 'insight':
        return <InsightDashboard />;
      case 'profile':
        return (
          <div className="p-8">
            <ProfileHeader profile={mockProfile} />
            <ProfileStats stats={mockStats} />
            <ProfileMenu />
          </div>
        );
      default:
        return <ChatInterface />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onViewChange={setCurrentView} currentView={currentView} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;