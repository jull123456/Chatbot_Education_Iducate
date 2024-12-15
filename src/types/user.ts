export interface UserSurvey {
  id: string;
  username: string;
  email: string;
  gender: string;
  country: string;
  degree: string;
  major: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  survey?: UserSurvey;
}