// Core exports
export { ApiClient } from './core/client';
export { FetchHttp } from './core/http';
export { ApiError, TimeoutError, NetworkError } from './core/errors';
export type { Http, HttpRequest, HttpResponse } from './core/http';
export type { AuthProvider } from './core/auth';
export type { ClientConfig } from './core/types';

// Auth providers
export {
  BearerTokenAuth,
  ApiKeyAuth,
  BasicAuth,
  CustomHeaderAuth,
} from './core/auth';

// Types and utilities
export type {
  Optional,
  RequiredFields,
  DeepPartial,
  PaginationParams,
  PaginatedResponse,
  SortParams,
  FilterParams,
  ExtractResponseData,
} from './core/types';

// Models
export type {
  User,
  UserRole,
  CreateUserRequest,
  UpdateUserRequest,
  UserListParams,
} from './models/User';

export type {
  Policy,
  ProductType,
  PolicyStatus,
  CreatePolicyRequest,
  UpdatePolicyRequest,
  PolicyListParams,
} from './models/Policy';

// Endpoints
export * from './endpoints';
