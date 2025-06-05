const express = require('express');
const { authenticate } = require('../middleware');
const { 
  getMetrics, 
  createMetric
} = require('../controllers/metrics.controller');

const router = express.Router();

// TODO: Re-enable authentication once configured
// router.use(authenticate);

// Get metrics by category
router.get('/', getMetrics);

// Create new metric
router.post('/', createMetric);

module.exports = router;
