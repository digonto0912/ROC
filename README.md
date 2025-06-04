# Reason of Creation (ROC) - Personal Metrics Tracker

## Overview
ROC is a comprehensive metrics tracking application that helps users monitor and analyze various aspects of their life across multiple categories. The application features a Next.js frontend with Material-UI components and a Node.js/Express backend, both integrated with Firebase for real-time data storage and retrieval.

## Project Structure

```
reason-of-creation/
├── app/                    # Next.js frontend application
│   ├── firebase/          # Firebase client configuration
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages/routes
│   └── components/        # Reusable UI components
├── server/                # Express.js backend
│   └── src/
│       ├── config/       # Server configurations
│       ├── controllers/  # Route handlers
│       ├── middleware/   # Express middleware
│       ├── models/       # Data models
│       ├── routes/       # API routes
│       ├── services/     # Business logic
│       └── utils/        # Helper functions
```

## Key Features
- Real-time metric tracking across 6 categories
- Interactive dashboards with data visualization
- Automatic KPI calculations
- Firebase integration for data persistence
- RESTful API architecture

## Categories
1. Business Metrics
2. Daily Improvement (One Better Every Day)
3. Good vs Bad Habits
4. Money Tracking
5. Prayer Schedule
6. World Affairs Tracker (Duniya Main Tracker)

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account with Firestore enabled

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Create `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5001/api/metrics
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Place your Firebase Admin SDK service account JSON in `server/src/config/`
   - Update Firebase configuration in `server/src/config/firebase.config.js`

4. Start the server:
   ```bash
   npm start
   ```

## API Documentation

### Metrics API

#### GET /api/metrics
- Query Parameters:
  - category: string (required)
- Returns: List of metrics for the specified category

#### POST /api/metrics
- Body:
  - category: string (required)
  - rawData: object (required)
- Returns: Created metric with calculated KPIs

#### PUT /api/metrics/:id
- Parameters:
  - id: string (metric ID)
- Body:
  - updates: object
- Returns: Updated metric

#### DELETE /api/metrics/:id
- Parameters:
  - id: string (metric ID)
- Returns: Success message

## Development Guidelines

### Code Structure
- Frontend components follow atomic design principles
- Backend follows MVC architecture
- Use TypeScript types/interfaces where possible
- Follow ESLint and Prettier configurations

### State Management
- React hooks for local state
- Context API for global state
- Firebase real-time updates

### Error Handling
- Client-side error boundaries
- Server-side error middleware
- Proper HTTP status codes

### Data Flow
1. Client makes request to Express backend API
2. Backend validates request and processes data
3. Firebase Admin SDK handles database operations
4. Results are returned to client
5. React components update with new data

### Metric Categories and KPIs

Each category has specific metrics and KPIs:

#### Business Metrics
- Revenue tracking
- Customer acquisition
- Growth indicators

#### Daily Improvement
- Personal goals
- Habit formation
- Progress tracking

#### Good vs Bad Habits
- Positive behavior tracking
- Negative behavior monitoring
- Improvement ratios

#### Money Tracking
- Income sources
- Expense categories
- Savings goals

#### Prayer Schedule
- Prayer times
- Consistency tracking
- Spiritual goals

#### World Affairs
- Current events
- Knowledge acquisition
- Global awareness

## Troubleshooting

### Common Issues

1. Connection Issues
   ```
   Check server port (default: 5001)
   Verify Firebase credentials
   Check CORS settings
   ```

2. Data Not Updating
   ```
   Verify Firebase rules
   Check real-time listeners
   Validate data structure
   ```

3. API Errors
   ```
   Check request format
   Verify authentication
   Review error logs
   ```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details. 
