import React from 'react';
import { useChatStore } from './store';

interface NavItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

interface DrawerBackdropProps {
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({ children, active = false, onClick }) => {
  return (
    <li>
      <div
        className={` ${active ? '' : ''}`}
        onClick={onClick}
      >
        {children}
      </div>
    </li>
  );
};

export const DrawerBackdrop: React.FC<DrawerBackdropProps> = ({ onClick }) => {
  return (
    <div
      className="fixed inset-0 z-30 bg-black opacity-50"
      onClick={onClick}
    ></div>
  );
};

