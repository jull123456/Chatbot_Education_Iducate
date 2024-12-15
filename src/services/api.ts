import { API_CONFIG } from '../config/api';
import { getAccessToken, getIdToken } from '../utils/auth';
import { UserSurvey } from '../types/user';
import { NewsItem, InsightFilters, NewsResponse } from '../types/insight';

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const getHeaders = () => {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const access_token = getAccessToken();
  const id_token = getIdToken(); 

  if (access_token) {
    headers.Authorization = `Bearer ${access_token}`;
  }
  if (id_token) {
    headers['id_token'] = id_token;
  }

  return headers;
};

export async function saveSurvey(surveyData: UserSurvey): Promise<void> {
  try {
    const response = await fetch('https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/dev-user/users', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(surveyData),
    });
    console.log(getHeaders());
    console.log(response);

    if (!response.ok) {
      throw new ApiError('Failed to save survey data', response.status);
    }

    
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to save survey data', 500);  // Tambahkan status jika perlu
  }
  
}

export async function checkSurveyStatus(): Promise<{ data: any, success: boolean }> {
  try {
    const response = await fetch('https://gcdzehfy8c.execute-api.ap-southeast-1.amazonaws.com/dev-user/users', {
      method: 'GET',
      headers: getHeaders(),
    });

    console.info(response);
    
    if (!response.ok) {
      throw new ApiError('Failed to check survey status', response.status);
    }
    
    const data = await response.json();
    console.log(data);
    
    // Mengembalikan data dan status keberhasilan (boolean) dalam bentuk objek
    return { data, success: response.ok };

  } catch (error) {
    throw new ApiError('Failed to check survey status');
  }
}


export async function fetchNews(filters: Partial<InsightFilters>): Promise<NewsItem[]> {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) {
      throw new ApiError('Authentication required');
    }

    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.news}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new ApiError('Authentication expired', 401);
      }
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data: NewsResponse = await response.json();
    
    if (data.status !== 200) {
      throw new ApiError(data.message || 'Failed to fetch news');
    }

    return data.data || [];
  } catch (error) {
    if (error instanceof ApiError) {
      // Handle 401 errors by redirecting to login
      if (error.status === 401) {
        window.location.href = '/login';
      }
      throw error;
    }
    throw new ApiError('Failed to fetch news data. Please try again later.');
  }
}