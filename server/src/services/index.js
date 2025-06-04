// Re-export everything from metrics service
const metricsService = require('./metrics.service');

module.exports = {
  ...metricsService
};
