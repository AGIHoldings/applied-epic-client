import type { HttpRequest } from './http';

export interface AuthProvider {
  authenticate(request: HttpRequest): HttpRequest;
}

export class BearerTokenAuth implements AuthProvider {
  constructor(private token: string) {}

  authenticate(request: HttpRequest): HttpRequest {
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${this.token}`,
      },
    };
  }
}

export class ApiKeyAuth implements AuthProvider {
  constructor(
    private apiKey: string,
    private headerName: string = 'X-API-Key',
  ) {}

  authenticate(request: HttpRequest): HttpRequest {
    return {
      ...request,
      headers: {
        ...request.headers,
        [this.headerName]: this.apiKey,
      },
    };
  }
}

export class BasicAuth implements AuthProvider {
  constructor(
    private username: string,
    private password: string,
  ) {}

  authenticate(request: HttpRequest): HttpRequest {
    const credentials = btoa(`${this.username}:${this.password}`);
    return {
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Basic ${credentials}`,
      },
    };
  }
}

export class CustomHeaderAuth implements AuthProvider {
  constructor(
    private headerName: string,
    private headerValue: string,
  ) {}

  authenticate(request: HttpRequest): HttpRequest {
    return {
      ...request,
      headers: {
        ...request.headers,
        [this.headerName]: this.headerValue,
      },
    };
  }
}
