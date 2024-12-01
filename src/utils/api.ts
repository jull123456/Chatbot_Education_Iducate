import { API_CONFIG } from '../config/api';

export function buildUrl(endpoint: string, params?: Record<string, string>): string {
  const url = new URL(`${API_CONFIG.baseUrl}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }
  
  return url.toString();
}