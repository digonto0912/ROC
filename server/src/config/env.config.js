require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5001,  // Changed to 5001 to avoid conflict
  nodeEnv: process.env.NODE_ENV || 'development',
  firebaseServiceAccountKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000']
};
