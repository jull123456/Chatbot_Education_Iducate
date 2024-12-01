import React, { useState } from 'react';
import { InsightFilters } from './InsightFilters';
import { NewsCard } from './NewsCard';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { useNews } from '../../hooks/useNews';
import { countries, degrees, majors } from '../../constants/filterOptions';

export function InsightDashboard() {
  const [filters, setFilters] = useState({
    country: countries[0].value,
    degree: degrees[0].value,
    major: majors[0].value
  });

  const { data: news, loading, error } = useNews(filters);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">NEWS Updates</h1>
        <div className="h-0.5 w-24 bg-blue-600"></div>
        <p className="text-gray-700 mt-4 font-medium">
          — {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
      </div>

      <div className="sticky top-0 bg-white z-10 py-4">
        <InsightFilters
          filters={filters}
          onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
          options={{ countries, degrees, majors }}
        />
      </div>

      {loading && <LoadingSpinner />}
      
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && news.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          No news found for the selected filters.
        </div>
      )}
      
      {!loading && !error && news.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
}