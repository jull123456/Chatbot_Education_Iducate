import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// Moon,
import { Bot, Lightbulb, User, Minimize,  LogOut, MessageSquare,HandIcon, MessageCircleIcon } from 'lucide-react';
import { SidebarButton } from './SidebarButton';
import { Logo } from './Logo';
// import { NewChat } from '../history/newChat';
import { History } from '../history/History';
import { useChatStore } from '../chat/store';

interface SidebarProps {
  isMinimized: boolean;
  isDarkMode: boolean;
  onToggleMinimize: () => void;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export function Sidebar({
  isMinimized,
  // isDarkMode,
  onToggleMinimize,
  // onToggleDarkMode,
  onLogout
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false); 
  const {setShowResults, setChatId, setMessage, inputFieldRef} = useChatStore();

  const newChat = () => {
    setShowResults(false);
    setChatId(null);
    console.log(setChatId);
    setMessage([]);
    console.log(setMessage);
    inputFieldRef?.current?.focus();
    console.info('gagal')
  };

  const toggleHistory = () => {
    setIsHistoryVisible((prev) => !prev);
  };



  return (
    <div className={`${isMinimized ? 'w-16' : 'w-64'} bg-[#1a1f2e] h-screen flex flex-col items-center py-6 transition-all duration-300`}>
      <div className="mb-8">
        <Logo isMinimized={isMinimized} />
      </div>

      <nav className="flex-1 w-full px-3 space-y-2">
      <SidebarButton
          icon={MessageCircleIcon}
          label="New Chat"
          isMinimized={isMinimized}
          onClick={newChat}
        />
        <SidebarButton
          icon={Bot}
          label="Chatbot"
          isActive={location.pathname === '/search'}
          isMinimized={isMinimized}
          onClick={() => navigate('/search')}
        />
        <SidebarButton
          icon={HandIcon}
          label="history"
          isMinimized={isMinimized}
          onClick={toggleHistory}
        />
        {isHistoryVisible && <History />}
        <SidebarButton
          icon={Lightbulb}
          label="Insight"
          isActive={location.pathname === '/insight'}
          isMinimized={isMinimized}
          onClick={() => navigate('/insight')}
        />
        <SidebarButton
          icon={MessageSquare}
          label="Forum"
          isActive={location.pathname === '/forum'}
          isMinimized={isMinimized}
          onClick={() => navigate('/forum')}
        />
        <SidebarButton
          icon={User}
          label="Profile"
          isActive={location.pathname === '/profile'}
          isMinimized={isMinimized}
          onClick={() => navigate('/profile')}
        />
      </nav>

      <div className="w-full px-3 space-y-2">
        <SidebarButton
          icon={Minimize}
          label="Minimize"
          isMinimized={isMinimized}
          onClick={onToggleMinimize}
        />
        {/* <SidebarButton
          icon={Moon}
          label="Dark Mode"
          isActive={isDarkMode}
          isMinimized={isMinimized}
          onClick={onToggleDarkMode}
        /> */}
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