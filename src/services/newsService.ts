import { API_CONFIG } from '../config/api';
import { InsightFilters, NewsItem } from '../types/insight';
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
      },
      mode: 'cors'
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}