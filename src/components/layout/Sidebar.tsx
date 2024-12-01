import React from 'react';
import { Home, Lightbulb, User, Minimize, Moon, LogOut, MessageSquare } from 'lucide-react';
import { SidebarButton } from './SidebarButton';
import { Logo } from './Logo';

interface SidebarProps {
  isMinimized: boolean;
  isDarkMode: boolean;
  currentView: 'search' | 'insight' | 'profile' | 'forum';
  onViewChange: (view: 'search' | 'insight' | 'profile' | 'forum') => void;
  onToggleMinimize: () => void;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export function Sidebar({
  isMinimized,
  isDarkMode,
  currentView,
  onViewChange,
  onToggleMinimize,
  onToggleDarkMode,
  onLogout
}: SidebarProps) {
  return (
    <div className={`${isMinimized ? 'w-16' : 'w-64'} bg-[#1a1f2e] h-screen flex flex-col items-center py-6 transition-all duration-300`}>
      <div className="mb-8">
        <Logo isMinimized={isMinimized} />
      </div>

      <nav className="flex-1 w-full px-3 space-y-2">
        <SidebarButton
          icon={Home}
          label="Search"
          isActive={currentView === 'search'}
          isMinimized={isMinimized}
          onClick={() => onViewChange('search')}
        />
        <SidebarButton
          icon={Lightbulb}
          label="Insight"
          isActive={currentView === 'insight'}
          isMinimized={isMinimized}
          onClick={() => onViewChange('insight')}
        />
        <SidebarButton
          icon={MessageSquare}
          label="Forum"
          isActive={currentView === 'forum'}
          isMinimized={isMinimized}
          onClick={() => onViewChange('forum')}
        />
        <SidebarButton
          icon={User}
          label="Profile"
          isActive={currentView === 'profile'}
          isMinimized={isMinimized}
          onClick={() => onViewChange('profile')}
        />
      </nav>

      <div className="w-full px-3 space-y-2">
        <SidebarButton
          icon={Minimize}
          label="Minimize"
          isMinimized={isMinimized}
          onClick={onToggleMinimize}
        />
        <SidebarButton
          icon={Moon}
          label="Dark Mode"
          isActive={isDarkMode}
          isMinimized={isMinimized}
          onClick={onToggleDarkMode}
        />
        <SidebarButton
          icon={LogOut}
          label="Logout"
          isMinimized={isMinimized}
          onClick={onLogout}
        />
      </div>
    </div>
  );
}