export interface NewsItem {
  title: string;
  thumbnail: string;
  snippet: string;
  link: string;
}

export interface NewsResponse {
  status: number;
  message: string;
  count: number;
  data: NewsItem[];
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface InsightFilters {
  country: string;
  degree: string;
  major: string;
}