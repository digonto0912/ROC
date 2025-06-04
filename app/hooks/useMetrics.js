"use client";

import { useState, useEffect } from "react";
import {
  getLatestMetrics,
  updateMetricData,
  deleteMetric,
} from "../firebase/metricsService";

export const useMetrics = (category) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMetrics = async () => {
      if (!category) return;
      try {
        setLoading(true);
        const response = await getLatestMetrics(category);
        if (isMounted) {
          setMetrics(response.metrics || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching metrics:", err);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMetrics();

    // Poll for updates every 30 seconds
    const intervalId = setInterval(fetchMetrics, 30000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [category]);

  const updateMetrics = async (newData) => {
    try {
      setLoading(true);
      if (metrics?.id) {
        await updateMetricData(metrics.id, newData);
      }
      setMetrics((prev) => ({
        ...prev,
        ...newData,
      }));
      setError(null);
    } catch (err) {
      console.error("Error updating metrics:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeMetric = async (id) => {
    try {
      setLoading(true);
      await deleteMetric(id);
      setMetrics(null);
      setError(null);
    } catch (err) {
      console.error("Error deleting metric:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { metrics, loading, error, updateMetrics };
};
