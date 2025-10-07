# Applied Epic API Client

A TypeScript client for the Applied Epic API with full type safety and modern JavaScript features.

## Features

- 🔒 **Type Safe**: Full TypeScript support with generated types
- 🚀 **Modern**: ESM + CJS support, tree-shakable
- 🔧 **Flexible**: Pluggable HTTP transport and authentication
- 📦 **Lightweight**: Minimal dependencies, optimized bundle size
- 🧪 **Tested**: Comprehensive test suite with mocked HTTP layer

## Installation

```bash
npm install @agiholdings/applied-epic-client
# or
yarn add @agiholdings/applied-epic-client
# or
pnpm add @agiholdings/applied-epic-client
```

## Quick Start

```typescript
import { ApiClient, BearerTokenAuth, getUser, createUser } from '@agiholdings/applied-epic-client';

// Create client
const client = new ApiClient({
  baseUrl: 'https://api.appliedepic.com',
  headers: {
    'User-Agent': 'MyApp/1.0.0',
  },
});

// Set authentication
client.setAuth(new BearerTokenAuth('your-api-token'));

// Use endpoints
const user = await getUser(client, 'user-123');
const newUser = await createUser(client, {
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user',
});
```

## Authentication

The client supports multiple authentication methods:

```typescript
import { 
  BearerTokenAuth, 
  ApiKeyAuth, 
  BasicAuth, 
  CustomHeaderAuth 
} from '@agiholdings/applied-epic-client';

// Bearer token
client.setAuth(new BearerTokenAuth('your-jwt-token'));

// API key
client.setAuth(new ApiKeyAuth('your-api-key', 'X-API-Key'));

// Basic auth
client.setAuth(new BasicAuth('username', 'password'));

// Custom header
client.setAuth(new CustomHeaderAuth('Authorization', 'Custom your-token'));
```

## Available Endpoints

### Users

```typescript
import { 
  getUser, 
  listUsers, 
  createUser, 
  updateUser, 
  deleteUser,
  getUserByEmail 
} from '@agiholdings/applied-epic-client';

// Get user by ID
const user = await getUser(client, 'user-123');

// List users with pagination
const users = await listUsers(client, {
  page: 1,
  limit: 10,
  role: 'admin',
  isActive: true,
});

// Create new user
const newUser = await createUser(client, {
  email: 'jane@example.com',
  firstName: 'Jane',
  lastName: 'Smith',
  role: 'user',
});

// Update user
const updatedUser = await updateUser(client, 'user-123', {
  firstName: 'Jane',
  lastName: 'Doe',
});

// Delete user
await deleteUser(client, 'user-123');
```

### Policies

```typescript
import { 
  getPolicy, 
  listPolicies, 
  createPolicy, 
  updatePolicy, 
  deletePolicy,
  getPoliciesByClient,
  getPoliciesByCarrier 
} from '@agiholdings/applied-epic-client';

// Get policy by ID
const policy = await getPolicy(client, 'policy-123');

// List policies with filters
const policies = await listPolicies(client, {
  page: 1,
  limit: 20,
  productType: 'auto',
  status: 'active',
});

// Create new policy
const newPolicy = await createPolicy(client, {
  policyNumber: 'POL-2024-001',
  clientId: 'client-123',
  carrierId: 'carrier-456',
  productType: 'auto',
  effectiveDate: '2024-01-01',
  expirationDate: '2024-12-31',
  premium: 1200.00,
});
```

## Error Handling

The client provides typed error classes for different error scenarios:

```typescript
import { ApiError, TimeoutError, NetworkError } from '@agiholdings/applied-epic-client';

try {
  const user = await getUser(client, 'invalid-id');
} catch (error) {
  if (error instanceof ApiError) {
    console.log('API Error:', error.status, error.payload);
    console.log('Is client error:', error.isClientError);
    console.log('Is server error:', error.isServerError);
  } else if (error instanceof TimeoutError) {
    console.log('Request timed out');
  } else if (error instanceof NetworkError) {
    console.log('Network error:', error.message);
  }
}
```

## Custom HTTP Transport

You can provide a custom HTTP implementation:

```typescript
import { Http, HttpRequest, HttpResponse } from '@agiholdings/applied-epic-client';

class CustomHttp implements Http {
  async send<T>(req: HttpRequest): Promise<HttpResponse<T>> {
    // Your custom implementation
    // e.g., using axios, node-fetch, etc.
  }
}

const client = new ApiClient(
  { baseUrl: 'https://api.appliedepic.com' },
  new CustomHttp()
);
```

## Development

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Lint code
pnpm lint

# Format code
pnpm format

# Build
pnpm build

# Generate types from OpenAPI (if available)
pnpm generate types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
