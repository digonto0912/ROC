// Metric categories
const metricCategories = {
  FINANCIAL: 'financial',
  PRODUCT: 'product',
  MARKETING: 'marketing',
  SALES: 'sales',
  CUSTOMER: 'customer',
  OPERATIONS: 'operations'
};

// KPI calculation methods
const kpiCalculations = {
  revenue: (data) => {
    const { monthlyIncome = 0, productRevenue = 0, serviceRevenue = 0 } = data;
    return monthlyIncome + productRevenue + serviceRevenue;
  },

  cac: (data) => {
    const { marketingSpend = 0, newCustomers = 1 } = data;
    return marketingSpend / newCustomers;
  },

  clv: (data) => {
    const { 
      averagePurchaseValue = 0, 
      purchaseFrequency = 0, 
      customerLifespan = 1 
    } = data;
    return averagePurchaseValue * purchaseFrequency * customerLifespan;
  },

  grossMargin: (data) => {
    const { revenue = 0, costOfGoodsSold = 0 } = data;
    return revenue > 0 ? ((revenue - costOfGoodsSold) / revenue) * 100 : 0;
  },

  netProfitMargin: (data) => {
    const { revenue = 0, totalCosts = 0, taxes = 0 } = data;
    return revenue > 0 ? ((revenue - totalCosts - taxes) / revenue) * 100 : 0;
  }
};

// KPI Types with their configurations
const kpiTypes = {
  REVENUE: {
    category: metricCategories.FINANCIAL,
    calculate: kpiCalculations.revenue,
    requiredFields: ['monthlyIncome', 'productRevenue', 'serviceRevenue']
  },
  CAC: {
    category: metricCategories.FINANCIAL,
    calculate: kpiCalculations.cac,
    requiredFields: ['marketingSpend', 'newCustomers']
  },
  CLV: {
    category: metricCategories.FINANCIAL,
    calculate: kpiCalculations.clv,
    requiredFields: ['averagePurchaseValue', 'purchaseFrequency', 'customerLifespan']
  },
  GROSS_MARGIN: {
    category: metricCategories.FINANCIAL,
    calculate: kpiCalculations.grossMargin,
    requiredFields: ['revenue', 'costOfGoodsSold']
  },
  NET_PROFIT_MARGIN: {
    category: metricCategories.FINANCIAL,
    calculate: kpiCalculations.netProfitMargin,
    requiredFields: ['revenue', 'totalCosts', 'taxes']
  }
};

module.exports = {
  metricCategories,
  kpiTypes,
  kpiCalculations
};
