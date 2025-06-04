const { collections } = require('../config/firebase.config');
const { kpiTypes } = require('../models/metrics.model');

// Calculate KPIs for a given category and data
const calculateKPIs = async (category, data) => {
  try {
    // Get relevant KPI calculators for this category
    const categoryKPIs = Object.entries(kpiTypes)
      .filter(([_, kpi]) => kpi.category === category);

    if (categoryKPIs.length === 0) {
      throw new Error('No KPIs defined for this category');
    }

    // Calculate each KPI
    const kpis = {};
    const errors = [];

    for (const [kpiName, kpi] of categoryKPIs) {
      try {
        // Validate required fields
        const missingFields = kpi.requiredFields?.filter(field => 
          !data.hasOwnProperty(field) || data[field] === undefined || data[field] === null
        );

        if (missingFields && missingFields.length > 0) {
          throw new Error(`Missing required fields for ${kpiName}: ${missingFields.join(', ')}`);
        }

        kpis[kpiName.toLowerCase()] = kpi.calculate(data);
      } catch (error) {
        console.error(`Error calculating ${kpiName}:`, error);
        errors.push({ kpi: kpiName, error: error.message });
      }
    }

    // Store calculation history
    await collections.kpiHistory.add({
      category,
      kpis,
      rawData: data,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date()
    });

    if (Object.keys(kpis).length === 0) {
      throw new Error('All KPI calculations failed');
    }    return {
      kpis,
      errors: errors.length > 0 ? errors : undefined
    };
  } catch (error) {
    console.error('Error in calculateKPIs:', error);
    throw error;
    console.error('Error in calculateKPIs:', error);
    throw error;
  }
};

// Get historical KPI data
const getKPIHistory = async (category, startDate, endDate) => {
  try {
    let query = collections.kpiHistory
      .where('category', '==', category)
      .orderBy('timestamp', 'desc');

    if (startDate) {
      query = query.where('timestamp', '>=', new Date(startDate));
    }
    if (endDate) {
      query = query.where('timestamp', '<=', new Date(endDate));
    }

    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting KPI history:', error);
    throw error;
  }
};

// Analyze KPI trends
const analyzeKPITrends = async (category, kpiName, timeframe = '30d') => {
  try {
    const now = new Date();
    const startDate = new Date();
    
    switch(timeframe) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
    }

    const history = await getKPIHistory(category, startDate, now);
    
    if (history.length === 0) {
      return null;
    }

    const kpiValues = history
      .filter(item => item.kpis && item.kpis[kpiName.toLowerCase()])
      .map(item => ({
        value: item.kpis[kpiName.toLowerCase()],
        timestamp: item.timestamp.toDate()
      }))
      .sort((a, b) => a.timestamp - b.timestamp);

    if (kpiValues.length < 2) {
      return {
        trend: 'insufficient_data',
        changePercent: 0,
        averageValue: kpiValues[0]?.value || 0
      };
    }

    const firstValue = kpiValues[0].value;
    const lastValue = kpiValues[kpiValues.length - 1].value;
    const changePercent = ((lastValue - firstValue) / firstValue) * 100;
    const averageValue = kpiValues.reduce((sum, item) => sum + item.value, 0) / kpiValues.length;

    return {
      trend: changePercent > 0 ? 'up' : changePercent < 0 ? 'down' : 'stable',
      changePercent: Math.round(changePercent * 100) / 100,
      averageValue: Math.round(averageValue * 100) / 100,
      dataPoints: kpiValues
    };
  } catch (error) {
    console.error('Error analyzing KPI trends:', error);
    throw error;
  }
};

module.exports = {
  calculateKPIs,
  getKPIHistory,
  analyzeKPITrends
};
