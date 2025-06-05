const { collections } = require('../config/firebase.config');

// Get metrics for a category
const getMetrics = async (req, res) => {
  try {
    console.log('GET /api/metrics request received:', req.query);
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    console.log('Fetching metrics for category:', category);
    const metricsSnapshot = await collections.metrics
      .where('category', '==', category)
      .get();

    const metrics = [];
    metricsSnapshot.forEach(doc => {
      metrics.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({ metrics });
    
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Error fetching metrics" });
  }
};

// Create new metric
const createMetric = async (req, res) => {
  try {
    console.log('POST /api/metrics request received:', req.body);
    const { category, data } = req.body;

    if (!category || !data) {
      return res.status(400).json({ error: "Category and data are required" });
    }
    console.log('Creating new metric:', { category, data });
    const docRef = await collections.metrics.add({
      category,
      data,
      timestamp: new Date()
    });

    res.status(201).json({
      id: docRef.id,
      message: "Metric created successfully"
    });
  } catch (error) {
    console.error("Error creating metric:", error);
    res.status(500).json({ error: "Failed to create metric" });
  }
};

module.exports = {
  getMetrics,
  createMetric
};
