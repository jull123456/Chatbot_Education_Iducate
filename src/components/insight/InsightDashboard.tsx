import React, { useState } from 'react';
import { InsightFilters } from './InsightFilters';
import { NewsCard } from './NewsCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { useNews } from '../../hooks/useNews';
import { countries, degrees, majors } from '../../constants/filterOptions';
import { InsightFilters as FilterType } from '../../types/insight';

export function InsightDashboard() {
  const [filters, setFilters] = useState<Partial<FilterType>>({});
  const { data: news, loading, error } = useNews(filters);

  const handleFilterChange = (key: keyof FilterType, value: string) => {
    setFilters(prev => {
      if (!value) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleRetry = () => {
    setFilters({});
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">NEWS Updates</h1>
        <div className="h-0.5 w-24 bg-blue-600"></div>
        <p className="text-gray-700 mt-4 font-medium">
          — {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <div className="sticky top-0 bg-white dark:bg-gray-900 z-10 py-4 mb-8">
        <InsightFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          options={{ countries, degrees, majors }}
        />
      </div>

      {loading && <LoadingSpinner />}
      
      {error && (
        <ErrorMessage 
          message={error}
          onRetry={handleRetry}
        />
      )}
      
      {!loading && !error && news.length === 0 && (
        <div className="text-center py-8 text-gray-600 dark:text-gray-400">
          No news found for the selected filters.
        </div>
      )}
      
      {!loading && !error && news.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <NewsCard key={`${item.title}-${index}`} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}