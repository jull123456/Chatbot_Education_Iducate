import React from 'react';
import { ProfileStats as Stats } from '../../types/profile';
import { Briefcase, CheckCircle, Users } from 'lucide-react';

interface ProfileStatsProps {
  stats: Stats;
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Projects</span>
        </div>
        <div className="text-2xl font-semibold">{stats.projects}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium">Completed</span>
        </div>
        <div className="text-2xl font-semibold">{stats.completedTasks}</div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Collaborations</span>
        </div>
        <div className="text-2xl font-semibold">{stats.activeCollaborations}</div>
      </div>
    </div>
  );
}