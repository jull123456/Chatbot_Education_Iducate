import { InsightFilters, NewsResponse, NewsItem } from '../types/insight';
import { API_CONFIG } from '../config/api';

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchNews(filters: Partial<InsightFilters>): Promise<NewsItem[]> {
  try {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const queryString = queryParams.toString();
    const url = `${API_CONFIG.baseUrl}/news${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }

    const data: NewsResponse = await response.json();
    
    if (data.status !== 200) {
      throw new ApiError(data.message || 'Failed to fetch news');
    }

    return data.data || [];
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch news data. Please try again later.');
  }
}