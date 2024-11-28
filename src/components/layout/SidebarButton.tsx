import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isMinimized: boolean;
  onClick: () => void;
}

export function SidebarButton({
  icon: Icon,
  label,
  isActive = false,
  isMinimized,
  onClick,
}: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all
        ${isActive ? 'bg-blue-500/20 text-blue-500' : 'text-white/60 hover:bg-white/10'}`}
    >
      <Icon className="w-6 h-6" />
      {!isMinimized && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}