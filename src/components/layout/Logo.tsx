import React from 'react';

interface LogoProps {
  isMinimized: boolean;
}

export function Logo({ isMinimized }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
        <span className="text-white text-xl">O</span>
      </div>
      {!isMinimized && (
        <span className="text-white text-xl font-bold">OnioNix</span>
      )}
    </div>
  );
}