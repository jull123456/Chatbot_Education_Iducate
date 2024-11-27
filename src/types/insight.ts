export interface InsightMetric {
  id: string;
  title: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ProjectInsight {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  metrics: InsightMetric[];
}

export interface NewsUpdate {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  commentsCount: number;
}