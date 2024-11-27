import React from 'react';
import { Home, Lightbulb, User, Minimize, Moon, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: 'chat' | 'insight' | 'profile';
  onViewChange: (view: 'chat' | 'insight' | 'profile') => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <div className="w-20 bg-[#1a1f2e] h-screen flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xl">O</span>
        </div>
      </div>

      <nav className="flex-1 space-y-6">
        <button
          onClick={() => onViewChange('chat')}
          className={`p-3 rounded-xl transition-colors ${
            currentView === 'chat' ? 'bg-blue-500/20' : 'hover:bg-white/10'
          }`}
        >
          <Home className={`w-6 h-6 ${currentView === 'chat' ? 'text-blue-500' : 'text-white/60'}`} />
        </button>

        <button
          onClick={() => onViewChange('insight')}
          className={`p-3 rounded-xl transition-colors ${
            currentView === 'insight' ? 'bg-blue-500/20' : 'hover:bg-white/10'
          }`}
        >
          <Lightbulb className={`w-6 h-6 ${currentView === 'insight' ? 'text-blue-500' : 'text-white/60'}`} />
        </button>

        <button
          onClick={() => onViewChange('profile')}
          className={`p-3 rounded-xl transition-colors ${
            currentView === 'profile' ? 'bg-blue-500/20' : 'hover:bg-white/10'
          }`}
        >
          <User className={`w-6 h-6 ${currentView === 'profile' ? 'text-blue-500' : 'text-white/60'}`} />
        </button>
      </nav>

      <div className="space-y-6">
        <button className="p-3 rounded-xl hover:bg-white/10 transition-colors">
          <Minimize className="w-6 h-6 text-white/60" />
        </button>
        <button className="p-3 rounded-xl hover:bg-white/10 transition-colors">
          <Moon className="w-6 h-6 text-white/60" />
        </button>
        <button className="p-3 rounded-xl hover:bg-white/10 transition-colors">
          <LogOut className="w-6 h-6 text-white/60" />
        </button>
      </div>
    </div>
  );
}