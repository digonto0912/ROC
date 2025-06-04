const express = require('express');
const { authenticate } = require('../middleware');
const { 
  getMetrics, 
  createMetric, 
  updateMetric, 
  deleteMetric,
  calculateMetricKPIs
} = require('../controllers/metrics.controller');

const router = express.Router();

// TODO: Re-enable authentication once configured
// router.use(authenticate);

// Get metrics by category
router.get('/', getMetrics);

// Create new metric
router.post('/', createMetric);

// Update metric
router.put('/:id', updateMetric);

// Delete metric
router.delete('/:id', deleteMetric);

// Calculate KPIs for given data
router.post('/calculate', calculateMetricKPIs);

module.exports = router;
