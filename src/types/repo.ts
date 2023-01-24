export interface STATE_TYPE {
  loading: boolean;
  error: string;
  repo: REPO[];
  repoDetail: any;
  total: number;
  query: string;
  sort: string;
  order: Order;
  currentPage: number;
  perPage: number;
}

export type Order = "asc" | "desc";

export interface REPO {
  repoName: string;
  author: string;
  stars: string;
  watchers: string;
  forks: string;
  description: string;
  lastUpdate: string;
}

export interface DetailProps {
  repo: string | undefined;
  owner: string | undefined;
}
