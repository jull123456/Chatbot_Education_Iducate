import { InsightFilters, NewsResponse, NewsItem } from '../types/insight';

const API_BASE_URL = 'http://13.229.125.165';

export async function fetchNews(filters: InsightFilters): Promise<NewsItem[]> {
  try {
    const queryParams = new URLSearchParams({
      country: filters.country,
      degree: filters.degree,
      major: filters.major,
    });

    const response = await fetch(`${API_BASE_URL}/news?${queryParams}`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching news:', error);
    throw new Error('Failed to fetch news data. Please try again later.');
  }
}