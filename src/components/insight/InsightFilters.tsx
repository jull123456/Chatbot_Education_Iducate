import React from 'react';
import { FilterOption, InsightFilters as FilterType } from '../../types/insight';

interface InsightFiltersProps {
  filters: Partial<FilterType>;
  onFilterChange: (key: keyof FilterType, value: string) => void;
  options: {
    countries: FilterOption[];
    degrees: FilterOption[];
    majors: FilterOption[];
  };
}

export function InsightFilters({ filters, onFilterChange, options }: InsightFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <select
        value={filters.country || ''}
        onChange={(e) => onFilterChange('country', e.target.value)}
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="">All Countries</option>
        {options.countries.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={filters.degree || ''}
        onChange={(e) => onFilterChange('degree', e.target.value)}
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="">All Degrees</option>
        {options.degrees.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={filters.major || ''}
        onChange={(e) => onFilterChange('major', e.target.value)}
        className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option value="">All Majors</option>
        {options.majors.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}