// Shared runtime-safe type helpers

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  offset?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type SortParams = {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type FilterParams = Record<string, string | number | boolean | undefined>;

// Utility type for extracting response data from endpoint functions
export type ExtractResponseData<T> = T extends Promise<infer U> ? U : never;

// Utility type for API client configuration
export type ClientConfig = {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
};
