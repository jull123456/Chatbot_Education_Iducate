export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  commentsCount: number;
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