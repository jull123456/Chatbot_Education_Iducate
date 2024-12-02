import { useState, useEffect } from 'react';
import { NewsItem, InsightFilters } from '../types/insight';
import { fetchNews, ApiError } from '../services/api';

interface NewsState {
  data: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  data: [],
  loading: false,
  error: null
};

export function useNews(filters: Partial<InsightFilters>) {
  const [state, setState] = useState<NewsState>(initialState);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const data = await fetchNews(filters);
        if (mounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!mounted) return;

        const errorMessage = error instanceof ApiError 
          ? error.message 
          : 'An unexpected error occurred. Please try again later.';

        setState({
          data: [],
          loading: false,
          error: errorMessage
        });
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, [filters]);

  return state;
}