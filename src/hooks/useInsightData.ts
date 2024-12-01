import { useState, useEffect } from 'react';
import { NewsItem, InsightFilters } from '../types/insight';
import { fetchNews } from '../services/api';

export function useInsightData(filters: InsightFilters) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadNews() {
      if (!filters.country || !filters.degree || !filters.major) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await fetchNews(filters);
        if (mounted) {
          setNews(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch news');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadNews();

    return () => {
      mounted = false;
    };
  }, [filters]);

  return { news, loading, error };
}