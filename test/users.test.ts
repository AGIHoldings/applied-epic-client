import { describe, it, expect, vi } from 'vitest';
import { ApiClient } from '../src/core/client';
import { getUser, createUser, listUsers } from '../src/endpoints/users';
import type { User } from '../src/models/User';

// Mock HTTP implementation for testing
class MockHttp {
  async send<T>(req: any): Promise<{ status: number; headers: Headers; data: T }> {
    // Mock implementation - in real tests, you'd return expected data
    return {
      status: 200,
      headers: new Headers(),
      data: {} as T,
    };
  }
}

describe('User endpoints', () => {
  const mockHttp = new MockHttp();
  const client = new ApiClient({ baseUrl: 'https://api.example.com' }, mockHttp);

  it('should get user by id', async () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };

    vi.spyOn(mockHttp, 'send').mockResolvedValue({
      status: 200,
      headers: new Headers(),
      data: mockUser,
    });

    const user = await getUser(client, '1');
    expect(user).toEqual(mockUser);
  });

  it('should create user', async () => {
    const newUser = {
      email: 'new@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'user' as const,
    };

    const createdUser: User = {
      id: '2',
      ...newUser,
      isActive: true,
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
    };

    vi.spyOn(mockHttp, 'send').mockResolvedValue({
      status: 201,
      headers: new Headers(),
      data: createdUser,
    });

    const result = await createUser(client, newUser);
    expect(result).toEqual(createdUser);
  });

  it('should list users with pagination', async () => {
    const mockUsers = [
      {
        id: '1',
        email: 'user1@example.com',
        firstName: 'User',
        lastName: 'One',
        role: 'user' as const,
        isActive: true,
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      },
    ];

    const mockResponse = {
      data: mockUsers,
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
      },
    };

    vi.spyOn(mockHttp, 'send').mockResolvedValue({
      status: 200,
      headers: new Headers(),
      data: mockResponse,
    });

    const result = await listUsers(client, { page: 1, limit: 10 });
    expect(result).toEqual(mockResponse);
  });
});
