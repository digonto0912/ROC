const express = require('express');
const { port, nodeEnv } = require('./config/env.config');
const { cors, errorHandler, requestLogger } = require('./middleware');
const metricsRoutes = require('./routes/metrics.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    environment: nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/metrics', metricsRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port} in ${nodeEnv} mode`);
});
