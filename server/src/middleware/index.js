const { corsOrigins } = require("../config/env.config");

// CORS middleware
const cors = (req, res, next) => {
  const origin = req.headers.origin || "http://localhost:3000";

  // Allow localhost and our deployment domains
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

// Request logger middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`
    );
  });
  next();
};

// Authentication middleware (temporarily disabled)
const authenticate = async (req, res, next) => {
  // Skip authentication for now
  next();
  const token = authHeader.split(" ")[1];
  // TODO: Implement token verification with Firebase Admin
  // const decodedToken = await admin.auth().verifyIdToken(token);
  // req.user = decodedToken;
  next();
};

module.exports = {
  cors,
  errorHandler,
  requestLogger,
  authenticate,
};
