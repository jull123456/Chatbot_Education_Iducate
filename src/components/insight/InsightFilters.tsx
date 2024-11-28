import React from 'react';
import { Filter } from './Filter';
import { countries, degreeTypes, majors } from '../../data/filterOptions';

interface InsightFiltersProps {
  selectedCountry: string;
  selectedDegree: string;
  selectedMajor: string;
  onCountryChange: (value: string) => void;
  onDegreeChange: (value: string) => void;
  onMajorChange: (value: string) => void;
}

export function InsightFilters({
  selectedCountry,
  selectedDegree,
  selectedMajor,
  onCountryChange,
  onDegreeChange,
  onMajorChange,
}: InsightFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Filter
        label="Country"
        value={selectedCountry}
        onChange={onCountryChange}
        options={countries}
      />
      <Filter
        label="Degree's Level"
        value={selectedDegree}
        onChange={onDegreeChange}
        options={degreeTypes}
      />
      <Filter
        label="Major"
        value={selectedMajor}
        onChange={onMajorChange}
        options={majors}
      />
    </div>
  );
}