export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joinDate: Date;
}

export interface ProfileStats {
  projects: number;
  completedTasks: number;
  activeCollaborations: number;
}