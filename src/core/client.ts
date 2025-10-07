import type { Http, HttpRequest } from './http';
import type { AuthProvider } from './auth';
import type { ClientConfig } from './types';
import { FetchHttp } from './http';
import { ApiError } from './errors';

export class ApiClient {
  readonly http: Http;
  private authProvider?: AuthProvider;

  constructor(
    private config: ClientConfig,
    http?: Http,
  ) {
    this.http = http || new FetchHttp(config.baseUrl, config.headers);
  }

  setAuth(authProvider: AuthProvider): void {
    this.authProvider = authProvider;
  }

  async request<T = unknown>(req: HttpRequest): Promise<T> {
    // Apply authentication if configured
    const authenticatedReq = this.authProvider
      ? this.authProvider.authenticate(req)
      : req;

    // Add default timeout if not specified
    const requestWithTimeout = {
      ...authenticatedReq,
      timeoutMs: authenticatedReq.timeoutMs || this.config.timeout || 10000,
    };

    try {
      const response = await this.http.send<T>(requestWithTimeout);
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, undefined, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  // Convenience methods
  async get<T = unknown>(url: string, query?: Record<string, string | number | boolean | undefined>): Promise<T> {
    return this.request<T>({ method: 'GET', url, query });
  }

  async post<T = unknown>(url: string, body?: unknown): Promise<T> {
    return this.request<T>({ method: 'POST', url, body });
  }

  async put<T = unknown>(url: string, body?: unknown): Promise<T> {
    return this.request<T>({ method: 'PUT', url, body });
  }

  async patch<T = unknown>(url: string, body?: unknown): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, body });
  }

  async delete<T = unknown>(url: string): Promise<T> {
    return this.request<T>({ method: 'DELETE', url });
  }
}
