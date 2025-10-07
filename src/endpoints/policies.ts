import type { ApiClient } from '../core/client';
import type { Policy, CreatePolicyRequest, UpdatePolicyRequest, PolicyListParams } from '../models/Policy';
import type { PaginatedResponse } from '../core/types';

export function getPolicy(client: ApiClient, id: string): Promise<Policy> {
  return client.get<Policy>(`/policies/${id}`);
}

export function listPolicies(
  client: ApiClient,
  params?: PolicyListParams,
): Promise<PaginatedResponse<Policy>> {
  return client.get<PaginatedResponse<Policy>>('/policies', params);
}

export function createPolicy(
  client: ApiClient,
  policy: CreatePolicyRequest,
): Promise<Policy> {
  return client.post<Policy>('/policies', policy);
}

export function updatePolicy(
  client: ApiClient,
  id: string,
  updates: UpdatePolicyRequest,
): Promise<Policy> {
  return client.patch<Policy>(`/policies/${id}`, updates);
}

export function deletePolicy(client: ApiClient, id: string): Promise<void> {
  return client.delete<void>(`/policies/${id}`);
}

export function getPoliciesByClient(
  client: ApiClient,
  clientId: string,
  params?: Omit<PolicyListParams, 'clientId'>,
): Promise<PaginatedResponse<Policy>> {
  return client.get<PaginatedResponse<Policy>>(`/clients/${clientId}/policies`, params);
}

export function getPoliciesByCarrier(
  client: ApiClient,
  carrierId: string,
  params?: Omit<PolicyListParams, 'carrierId'>,
): Promise<PaginatedResponse<Policy>> {
  return client.get<PaginatedResponse<Policy>>(`/carriers/${carrierId}/policies`, params);
}
