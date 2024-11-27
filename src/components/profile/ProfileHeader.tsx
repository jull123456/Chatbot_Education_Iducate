import React from 'react';
import { UserProfile } from '../../types/profile';
import { Mail, Calendar } from 'lucide-react';

interface ProfileHeaderProps {
  profile: UserProfile;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full" />
          ) : (
            <span className="text-2xl font-semibold text-purple-600">
              {profile.name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <div className="flex items-center gap-4 mt-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {profile.email}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Joined {profile.joinDate.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}