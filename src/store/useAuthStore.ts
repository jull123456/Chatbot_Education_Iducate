import { create } from 'zustand';
import { User, UserSurvey } from '../types/user';
import { getAccessToken, removeTokens, parseIdToken } from '../utils/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasSurvey: boolean;
  surveyData: UserSurvey | null;
  setUser: (user: User) => void;
  setSurveyData: (data: UserSurvey) => void;
  logout: () => void;
  setHasSurvey: (value: boolean) => void;
  initializeFromToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!getAccessToken(),
  hasSurvey: false,
  surveyData: null,
  setUser: (user) => set({ user, isAuthenticated: true }),
  setSurveyData: (data) => set({ surveyData: data, hasSurvey: true }),
  logout: () => {
    removeTokens();
    set({ user: null, isAuthenticated: false, surveyData: null });
  },
  setHasSurvey: (value) => {
    console.log('Setting hasSurvey to:', value);  // Log nilai yang akan di-set
    set({ hasSurvey: value });
  }
  ,
  initializeFromToken: () => {
    const tokenData = parseIdToken();
    if (tokenData) {
      set({
        user: {
          id: tokenData.sub,
          email: tokenData.email,
          name: tokenData.name,
        },
        isAuthenticated: true,
      });
    }
  },
}));