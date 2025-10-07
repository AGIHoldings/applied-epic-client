export type HttpRequest = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  body?: unknown;
  timeoutMs?: number;
};

export type HttpResponse<T = unknown> = {
  status: number;
  headers: Headers;
  data: T;
};

export interface Http {
  send<T = unknown>(req: HttpRequest): Promise<HttpResponse<T>>;
}

// Default fetch-based implementation (browser/Node via undici)
export class FetchHttp implements Http {
  constructor(
    private baseUrl: string,
    private defaultHeaders: Record<string, string> = {},
  ) {}

  async send<T>(req: HttpRequest): Promise<HttpResponse<T>> {
    const url = new URL(req.url, this.baseUrl);
    
    // Add query parameters
    if (req.query) {
      Object.entries(req.query).forEach(([k, v]) => {
        if (v != null) {
          url.searchParams.set(k, String(v));
        }
      });
    }

    // Merge headers
    const headers = {
      'content-type': 'application/json',
      ...this.defaultHeaders,
      ...req.headers,
    };

    // Prepare body
    const body = req.body == null ? undefined : JSON.stringify(req.body);

    // Make request with timeout
    const controller = new AbortController();
    const timeoutId = req.timeoutMs
      ? setTimeout(() => controller.abort(), req.timeoutMs)
      : null;

    try {
      const response = await fetch(url, {
        method: req.method,
        headers,
        body,
        signal: controller.signal,
      });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const text = await response.text();
      const json = text ? JSON.parse(text) : undefined;

      if (!response.ok) {
        throw new ApiError(response.status, json, response.statusText);
      }

      return {
        status: response.status,
        headers: response.headers,
        data: json as T,
      };
    } catch (error) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      throw error;
    }
  }
}

// Re-export ApiError for convenience
import { ApiError } from './errors';
