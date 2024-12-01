import { useState, useEffect } from 'react';
import { NewsItem, InsightFilters } from '../types/insight';
import { getNews } from '../services/newsService';

export function useNews(filters: InsightFilters) {
  const [state, setState] = useState<{
    data: NewsItem[];
    loading: boolean;
    error: string | null;
  }>({
    data: [],
    loading: false,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function fetchNews() {
      if (!filters.country || !filters.degree || !filters.major) {
        setState(prev => ({ ...prev, data: [], error: null, loading: false }));
        return;
      }

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const data = await getNews(filters);
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (mounted) {
          setState({
            data: [],
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to fetch news'
          });
        }
      }
    }

    fetchNews();

    return () => {
      mounted = false;
    };
  }, [filters]);

  return state;
}