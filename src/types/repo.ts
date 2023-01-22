export interface STATE_TYPE {
  loading: boolean;
  error: string;
  repo: REPO[];
  repoDetail: any;
  total: number;
}

export interface REPO {
  repoName: string;
  author: string;
  stars: string;
  watchers: string;
  forks: string;
  description: string;
  lastUpdate: string;
}
