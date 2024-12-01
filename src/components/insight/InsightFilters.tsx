import React from 'react';
import { FilterOption } from '../../types/insight';

interface InsightFiltersProps {
  filters: {
    country: string;
    degree: string;
    major: string;
  };
  onFilterChange: (key: string, value: string) => void;
  options: {
    countries: FilterOption[];
    degrees: FilterOption[];
    majors: FilterOption[];
  };
}

export function InsightFilters({ filters, onFilterChange, options }: InsightFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <select
        value={filters.country}
        onChange={(e) => onFilterChange('country', e.target.value)}
        className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
      >
        <option value="">Select Country</option>
        {options.countries.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={filters.degree}
        onChange={(e) => onFilterChange('degree', e.target.value)}
        className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
      >
        <option value="">Select Degree</option>
        {options.degrees.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={filters.major}
        onChange={(e) => onFilterChange('major', e.target.value)}
        className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
      >
        <option value="">Select Major</option>
        {options.majors.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}