import { InsightFilters, NewsItem } from '../types/insight';

const API_BASE_URL = 'http://13.229.125.165';

export async function fetchNews(filters: InsightFilters): Promise<NewsItem[]> {
  const queryParams = new URLSearchParams({
    country: filters.country,
    degree: filters.degree,
    major: filters.major,
  });

  try {
    const response = await fetch(`${API_BASE_URL}/news?${queryParams}`, {
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