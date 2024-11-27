import React from 'react';
import { Settings, Shield, Bell, HelpCircle } from 'lucide-react';

export function ProfileMenu() {
  const menuItems = [
    { icon: Settings, label: 'Settings', href: '#settings' },
    { icon: Shield, label: 'Security', href: '#security' },
    { icon: Bell, label: 'Notifications', href: '#notifications' },
    { icon: HelpCircle, label: 'Help & Support', href: '#help' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
        >
          <item.icon className="w-5 h-5 text-gray-600" />
          <span className="font-medium">{item.label}</span>
        </a>
      ))}
    </div>
  );
}