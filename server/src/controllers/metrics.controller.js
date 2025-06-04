const { collections } = require("../config/firebase.config");
const { kpiTypes } = require("../models/metrics.model");
const { calculateKPIs } = require("../services/metrics.service");

// Get metrics for a category
const getMetrics = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Category is required" });
    }

    const metricsRef = collections.metrics;
    const query = metricsRef
      .where("category", "==", category)
      .orderBy("timestamp", "desc");
    const snapshot = await query.get();
    const metrics = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json({
      metrics,
      category,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({
      error: "Failed to fetch metrics",
      details: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Create new metric
const createMetric = async (req, res) => {
  try {
    const { category, rawData } = req.body;

    if (!category || !rawData) {
      return res
        .status(400)
        .json({ error: "Category and raw data are required" });
    }

    // Calculate KPIs
    const kpis = await calculateKPIs(category, rawData);

    const docRef = await collections.metrics.add({
      category,
      rawData,
      kpis,
      timestamp: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({
      id: docRef.id,
      message: "Metric created successfully",
    });
  } catch (error) {
    console.error("Error creating metric:", error);
    res.status(500).json({ error: "Failed to create metric" });
  }
};

// Update metric
const updateMetric = async (req, res) => {
  try {
    const { id } = req.query;
    const { rawData } = req.body;

    if (!id || !rawData) {
      return res
        .status(400)
        .json({ error: "Metric ID and raw data are required" });
    }

    const metricRef = collections.metrics.doc(id);
    const doc = await metricRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Metric not found" });
    }

    const existingData = doc.data();
    const kpis = await calculateKPIs(existingData.category, rawData);

    await metricRef.update({
      rawData,
      kpis,
      updatedAt: new Date(),
    });

    res.json({ message: "Metric updated successfully" });
  } catch (error) {
    console.error("Error updating metric:", error);
    res.status(500).json({ error: "Failed to update metric" });
  }
};

// Delete metric
const deleteMetric = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Metric ID is required" });
    }

    await collections.metrics.doc(id).delete();
    res.json({ message: "Metric deleted successfully" });
  } catch (error) {
    console.error("Error deleting metric:", error);
    res.status(500).json({ error: "Failed to delete metric" });
  }
};

// Calculate KPIs for given data
const calculateMetricKPIs = async (req, res) => {
  try {
    const { category, data } = req.body;

    if (!category || !data) {
      return res.status(400).json({ error: "Category and data are required" });
    }

    const kpis = await calculateKPIs(category, data);
    res.json({ kpis });
  } catch (error) {
    console.error("Error calculating KPIs:", error);
    res.status(500).json({ error: "Failed to calculate KPIs" });
  }
};

// Get metric trends
const getMetricTrends = async (req, res) => {
  try {
    const { category, kpiName, period } = req.query;

    if (!category || !kpiName) {
      return res
        .status(400)
        .json({ error: "Category and KPI name are required" });
    }

    const trends = await getKPITrends(
      category,
      kpiName,
      period ? parseInt(period) : 30
    );
    res.json(trends);
  } catch (error) {
    console.error("Error getting metric trends:", error);
    res.status(500).json({ error: "Failed to get metric trends" });
  }
};

// Sync with external integration
const syncIntegration = async (req, res) => {
  try {
    const { integration } = req.params;
    const { category } = req.query;

    if (!integration || !category) {
      return res
        .status(400)
        .json({ error: "Integration and category are required" });
    }

    // TODO: Implement actual integration sync logic
    const response = await fetch(
      `https://api.${integration.toLowerCase()}.com/metrics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            process.env[`${integration.toUpperCase()}_API_KEY`]
          }`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to sync with ${integration}`);
    }

    const data = await response.json();
    await saveMetricsData(category, data);

    res.json({
      message: `Successfully synced with ${integration}`,
      data,
    });
  } catch (error) {
    console.error("Error syncing with integration:", error);
    res
      .status(500)
      .json({ error: `Failed to sync with integration: ${error.message}` });
  }
};

module.exports = {
  getMetrics,
  createMetric,
  updateMetric,
  deleteMetric,
  calculateMetricKPIs,
  getMetricTrends,
  syncIntegration,
};
