// Validate numeric input
const validateNumeric = (value, fieldName) => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  if (value < 0) {
    throw new Error(`${fieldName} cannot be negative`);
  }
};

// Format percentage values
const formatPercentage = (value, decimals = 2) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// Calculate percentage change
const calculatePercentageChange = (newValue, oldValue) => {
  if (oldValue === 0) return null;
  return ((newValue - oldValue) / oldValue) * 100;
};

// Group metrics by time period
const groupMetricsByPeriod = (metrics, period = 'day') => {
  const groups = {};
  
  metrics.forEach(metric => {
    let key;
    const date = new Date(metric.timestamp);
    
    switch(period) {
      case 'day':
        key = date.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      case 'month':
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'quarter':
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `${date.getFullYear()}-Q${quarter}`;
        break;
      case 'year':
        key = date.getFullYear().toString();
        break;
      default:
        key = date.toISOString();
    }
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(metric);
  });
  
  return groups;
};

// Calculate moving average
const calculateMovingAverage = (data, periods = 7) => {
  const result = [];
  for (let i = periods - 1; i < data.length; i++) {
    const sum = data.slice(i - periods + 1, i + 1).reduce((a, b) => a + b, 0);
    result.push(sum / periods);
  }
  return result;
};

// Format currency values
const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

module.exports = {
  validateNumeric,
  formatPercentage,
  calculatePercentageChange,
  groupMetricsByPeriod,
  calculateMovingAverage,
  formatCurrency
};
