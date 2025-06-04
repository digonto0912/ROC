# Reason of Creation - Server

Backend server implementation for the Reason of Creation application. Built with Express.js and Firebase Admin SDK.

## Table of Contents
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)

## Project Structure

```
server/
├── src/
│   ├── config/              # Configuration files
│   │   ├── env.config.js    # Environment variables configuration
│   │   └── firebase.config.js # Firebase Admin initialization
│   │
│   ├── controllers/         # Route controllers
│   │   └── metrics.controller.js # Handles metric-related operations
│   │
│   ├── middleware/          # Express middleware
│   │   └── index.js        # Authentication, CORS, logging middleware
│   │
│   ├── models/             # Data models and types
│   │   └── metrics.model.js # Metric categories and KPI calculations
│   │
│   ├── routes/             # API routes
│   │   └── metrics.routes.js # Metric endpoints
│   │
│   ├── services/           # Business logic
│   │   └── metrics.service.js # Metric processing and calculations
│   │
│   ├── utils/              # Utility functions
│   │   └── metrics.utils.js # Helper functions for metrics
│   │
│   └── index.js            # Main application entry point
│
├── .env.example            # Example environment variables
└── package.json            # Project dependencies and scripts
```

## Getting Started

1. **Prerequisites**
   - Node.js (v16 or higher)
   - npm or yarn
   - Firebase project with Firestore

2. **Installation**
   ```powershell
   # Clone the repository (if not already done)
   cd server
   npm install
   ```

3. **Environment Setup**
   ```powershell
   # Copy example environment file
   cp .env.example .env
   ```
   Then edit `.env` with your configuration.

4. **Start Development Server**
   ```powershell
   npm run dev
   ```

## API Endpoints

### Metrics API

#### GET /api/metrics
- Query metrics by category
- Parameters:
  - `category` (query): Metric category (financial, product, marketing, etc.)
- Returns: Array of metrics with calculated KPIs

#### POST /api/metrics
- Create new metric
- Body:
  ```json
  {
    "category": "financial",
    "rawData": {
      "revenue": 10000,
      "costs": 5000
      // ... other metric data
    }
  }
  ```

#### PUT /api/metrics/:id
- Update existing metric
- Parameters:
  - `id` (path): Metric ID
- Body: Same as POST

#### DELETE /api/metrics/:id
- Delete metric
- Parameters:
  - `id` (path): Metric ID

#### POST /api/metrics/calculate
- Calculate KPIs without saving
- Body:
  ```json
  {
    "category": "financial",
    "data": {
      // metric data
    }
  }
  ```

## Authentication

The server uses Firebase Authentication. All API endpoints require a valid Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase-id-token>
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Server port | No | 5000 |
| NODE_ENV | Environment | No | development |
| FIREBASE_SERVICE_ACCOUNT_KEY | Base64 encoded Firebase service account key | Yes | - |
| CORS_ORIGINS | Allowed CORS origins (comma-separated) | No | http://localhost:3000 |
| LOG_LEVEL | Logging level | No | debug |

## Development

### Available Scripts

```powershell
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

### Adding New Features

1. **New Routes**
   - Add route file in `src/routes/`
   - Add controller in `src/controllers/`
   - Register route in `src/index.js`

2. **New Models**
   - Add model file in `src/models/`
   - Define types and calculations

3. **Middleware**
   - Add middleware functions in `src/middleware/`

## Deployment

1. **Prerequisites**
   - Set up production environment variables
   - Configure Firebase Admin SDK

2. **Build and Deploy**
   ```powershell
   # Install production dependencies
   npm install --production

   # Start server
   npm start
   ```

3. **Health Check**
   - GET /health
   - Returns server status and environment

## Error Handling

The server uses a centralized error handling middleware. All errors are formatted as:

```json
{
  "error": "Error message",
  "stack": "Error stack (development only)"
}
```

## Performance Considerations

- KPI calculations are cached when possible
- Database queries are optimized with proper indexes
- Rate limiting is implemented on all endpoints
- Large datasets are paginated

## Security

- All routes are protected with Firebase Authentication
- Input validation on all endpoints
- CORS protection
- Rate limiting
- Secure headers
- Environment variable validation

## Monitoring

The server includes:
- Request logging
- Error tracking
- Performance monitoring
- Health check endpoint

## Support

For issues and feature requests, please create an issue in the repository.
