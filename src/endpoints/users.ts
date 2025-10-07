import type { ApiClient } from '../core/client';
import type { User, CreateUserRequest, UpdateUserRequest, UserListParams } from '../models/User';
import type { PaginatedResponse } from '../core/types';

export function getUser(client: ApiClient, id: string): Promise<User> {
  return client.get<User>(`/users/${id}`);
}

export function listUsers(
  client: ApiClient,
  params?: UserListParams,
): Promise<PaginatedResponse<User>> {
  return client.get<PaginatedResponse<User>>('/users', params);
}

export function createUser(
  client: ApiClient,
  user: CreateUserRequest,
): Promise<User> {
  return client.post<User>('/users', user);
}

export function updateUser(
  client: ApiClient,
  id: string,
  updates: UpdateUserRequest,
): Promise<User> {
  return client.patch<User>(`/users/${id}`, updates);
}

export function deleteUser(client: ApiClient, id: string): Promise<void> {
  return client.delete<void>(`/users/${id}`);
}

export function getUserByEmail(
  client: ApiClient,
  email: string,
): Promise<User> {
  return client.get<User>(`/users/email/${encodeURIComponent(email)}`);
}
