export interface Policy {
  id: string;
  policyNumber: string;
  clientId: string;
  carrierId: string;
  productType: ProductType;
  status: PolicyStatus;
  effectiveDate: string;
  expirationDate: string;
  premium: number;
  createdAt: string;
  updatedAt: string;
}

export type ProductType = 'auto' | 'home' | 'life' | 'health' | 'commercial' | 'other';

export type PolicyStatus = 'active' | 'inactive' | 'cancelled' | 'pending' | 'expired';

export interface CreatePolicyRequest {
  policyNumber: string;
  clientId: string;
  carrierId: string;
  productType: ProductType;
  effectiveDate: string;
  expirationDate: string;
  premium: number;
}

export interface UpdatePolicyRequest {
  policyNumber?: string;
  clientId?: string;
  carrierId?: string;
  productType?: ProductType;
  status?: PolicyStatus;
  effectiveDate?: string;
  expirationDate?: string;
  premium?: number;
}

export interface PolicyListParams {
  page?: number;
  limit?: number;
  clientId?: string;
  carrierId?: string;
  productType?: ProductType;
  status?: PolicyStatus;
  search?: string;
}
