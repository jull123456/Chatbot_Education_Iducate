import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewsItem, InsightFilters } from '../types/insight';
import { fetchNews, ApiError } from '../services/api';
import { useAuthStore } from '../store/useAuthStore';

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
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

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
          : 'An unexpected error occurred';

        setState({
          data: [],
          loading: false,
          error: errorMessage
        });

        if (error instanceof ApiError && error.status === 401) {
          navigate('/login');
        }
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, [filters, navigate, isAuthenticated]);

  return state;
}