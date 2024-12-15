import React from 'react';
import logo from './logo-1x1-dark-mode.png';
import logo1 from './logo-full-light-mode.png';

interface LogoProps {
  isMinimized: boolean;
}

export function Logo({ isMinimized }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      {!isMinimized ? (
        <div className="w-40 h-8 rounded-full flex items-center justify-center">
        <img src={logo1} alt="" />
        </div>
      ):(
        <div className="w-16 h-12 rounded-full flex items-center justify-center">
        <img src={logo} alt="" />
      </div>
      )}
      
    </div>
  );
}
