import { API_CONFIG } from '../config/api';
import { InsightFilters, NewsItem, NewsResponse } from '../types/insight';
import { buildUrl } from '../utils/api';

export async function getNews(filters: InsightFilters): Promise<NewsItem[]> {
  try {
    const url = buildUrl(API_CONFIG.endpoints.news, {
      country: filters.country,
      degree: filters.degree,
      major: filters.major,
    });

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: NewsResponse = await response.json();
    
    if (result.status !== 200) {
      throw new Error(result.message || 'Failed to fetch news');
    }

    return result.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}