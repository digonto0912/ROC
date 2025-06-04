const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(__dirname, '../config/roc-list-firebase-adminsdk-fbsvc-951e16e64c.json');
const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const collections = {
  metrics: db.collection('metrics')
};

const generateTrendData = (baseValue, days = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    value: baseValue + (Math.random() - 0.5) * baseValue * 0.5,
    timestamp: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString()
  }));
};

const metrics = [
  // Financial Metrics
  {
    category: 'financial',
    title: 'Revenue',
    value: '$128,400',
    trend: 'up',
    trendPercent: '+12.5%',
    icon: '💰',
    rawData: generateTrendData(128400)
  },
  {
    category: 'financial',
    title: 'Customer Acquisition Cost',
    value: '$45.20',
    trend: 'down',
    trendPercent: '-8.3%',
    icon: '🎯',
    rawData: generateTrendData(45.20)
  },
  {
    category: 'financial',
    title: 'Customer Lifetime Value',
    value: '$2,340',
    trend: 'up',
    trendPercent: '+15.7%',
    icon: '🔁',
    rawData: generateTrendData(2340)
  },
  {
    category: 'financial',
    title: 'Gross Profit Margin',
    value: '68.5%',
    trend: 'up',
    trendPercent: '+2.1%',
    icon: '📈',
    rawData: generateTrendData(68.5)
  },
  {
    category: 'financial',
    title: 'Net Profit Margin',
    value: '24.3%',
    trend: 'stable',
    trendPercent: '0.0%',
    icon: '💼',
    rawData: generateTrendData(24.3)
  },
  {
    category: 'financial',
    title: 'Burn Rate',
    value: '$18,500',
    trend: 'down',
    trendPercent: '-5.2%',
    icon: '🔥',
    rawData: generateTrendData(18500)
  },

  // Product/Tech Metrics
  {
    category: 'product',
    title: 'DAU/MAU',
    value: '12.5K/45.2K',
    trend: 'up',
    trendPercent: '+18.2%',
    icon: '👥',
    rawData: generateTrendData(12500)
  },
  {
    category: 'product',
    title: 'Bug Rate',
    value: '2.3%',
    trend: 'down',
    trendPercent: '-12.1%',
    icon: '🐞',
    rawData: generateTrendData(2.3)
  },
  {
    category: 'product',
    title: 'Feature Adoption',
    value: '76.8%',
    trend: 'up',
    trendPercent: '+9.4%',
    icon: '📌',
    rawData: generateTrendData(76.8)
  },
  {
    category: 'product',
    title: 'Deployment Frequency',
    value: '14/week',
    trend: 'up',
    trendPercent: '+25.0%',
    icon: '🚀',
    rawData: generateTrendData(14)
  },
  {
    category: 'product',
    title: 'Time to Market',
    value: '23 days',
    trend: 'down',
    trendPercent: '-15.3%',
    icon: '⏱',
    rawData: generateTrendData(23)
  },
  {
    category: 'product',
    title: 'Uptime',
    value: '99.94%',
    trend: 'stable',
    trendPercent: '+0.1%',
    icon: '📡',
    rawData: generateTrendData(99.94)
  },

  // Marketing Metrics
  {
    category: 'marketing',
    title: 'Cost Per Lead',
    value: '$28.50',
    trend: 'down',
    trendPercent: '-11.7%',
    icon: '🎣',
    rawData: generateTrendData(28.50)
  },
  {
    category: 'marketing',
    title: 'Website Traffic',
    value: '125.4K',
    trend: 'up',
    trendPercent: '+22.8%',
    icon: '📊',
    rawData: generateTrendData(125400)
  },
  {
    category: 'marketing',
    title: 'Conversion Rate',
    value: '3.2%',
    trend: 'up',
    trendPercent: '+7.5%',
    icon: '🔄',
    rawData: generateTrendData(3.2)
  },
  {
    category: 'marketing',
    title: 'Bounce Rate',
    value: '32.1%',
    trend: 'down',
    trendPercent: '-4.3%',
    icon: '🔙',
    rawData: generateTrendData(32.1)
  },
  {
    category: 'marketing',
    title: 'Email Open Rate',
    value: '24.7%',
    trend: 'up',
    trendPercent: '+3.2%',
    icon: '📩',
    rawData: generateTrendData(24.7)
  },
  {
    category: 'marketing',
    title: 'Social Engagement',
    value: '8.9K',
    trend: 'up',
    trendPercent: '+16.4%',
    icon: '💬',
    rawData: generateTrendData(8900)
  },

  // Sales Metrics
  {
    category: 'sales',
    title: 'Monthly Recurring Revenue',
    value: '$89,230',
    trend: 'up',
    trendPercent: '+19.6%',
    icon: '💸',
    rawData: generateTrendData(89230)
  },
  {
    category: 'sales',
    title: 'Sales Growth Rate',
    value: '14.2%',
    trend: 'up',
    trendPercent: '+2.8%',
    icon: '📈',
    rawData: generateTrendData(14.2)
  },
  {
    category: 'sales',
    title: 'Average Deal Size',
    value: '$4,850',
    trend: 'up',
    trendPercent: '+8.9%',
    icon: '💼',
    rawData: generateTrendData(4850)
  },
  {
    category: 'sales',
    title: 'Win Rate',
    value: '67.3%',
    trend: 'up',
    trendPercent: '+5.1%',
    icon: '🏆',
    rawData: generateTrendData(67.3)
  },
  {
    category: 'sales',
    title: 'Sales Cycle Length',
    value: '34 days',
    trend: 'down',
    trendPercent: '-6.7%',
    icon: '⏳',
    rawData: generateTrendData(34)
  },
  {
    category: 'sales',
    title: 'Churn Rate',
    value: '2.1%',
    trend: 'down',
    trendPercent: '-12.5%',
    icon: '🔄',
    rawData: generateTrendData(2.1)
  },

  // Customer Metrics
  {
    category: 'customer',
    title: 'Net Promoter Score',
    value: '72',
    trend: 'up',
    trendPercent: '+8.5%',
    icon: '❤️',
    rawData: generateTrendData(72)
  },
  {
    category: 'customer',
    title: 'Customer Retention Rate',
    value: '94.7%',
    trend: 'up',
    trendPercent: '+1.2%',
    icon: '🔁',
    rawData: generateTrendData(94.7)
  },
  {
    category: 'customer',
    title: 'Customer Satisfaction',
    value: '4.6/5',
    trend: 'stable',
    trendPercent: '+0.1',
    icon: '😀',
    rawData: generateTrendData(4.6)
  },
  {
    category: 'customer',
    title: 'First Response Time',
    value: '2.3 hrs',
    trend: 'down',
    trendPercent: '-18.7%',
    icon: '⌚',
    rawData: generateTrendData(2.3)
  },
  {
    category: 'customer',
    title: 'Resolution Time',
    value: '4.7 hrs',
    trend: 'down',
    trendPercent: '-23.1%',
    icon: '🛠',
    rawData: generateTrendData(4.7)
  },

  // Operations Metrics
  {
    category: 'operations',
    title: 'Inventory Turnover',
    value: '8.4x',
    trend: 'up',
    trendPercent: '+12.3%',
    icon: '📦',
    rawData: generateTrendData(8.4)
  },
  {
    category: 'operations',
    title: 'Order Fulfillment Time',
    value: '1.8 days',
    trend: 'down',
    trendPercent: '-15.6%',
    icon: '📬',
    rawData: generateTrendData(1.8)
  },
  {
    category: 'operations',
    title: 'Employee Productivity',
    value: '87.2%',
    trend: 'up',
    trendPercent: '+4.8%',
    icon: '⚙',
    rawData: generateTrendData(87.2)
  },
  {
    category: 'operations',
    title: 'Utilization Rate',
    value: '82.5%',
    trend: 'stable',
    trendPercent: '+0.3%',
    icon: '📐',
    rawData: generateTrendData(82.5)
  },
  {
    category: 'operations',
    title: 'Defect Rate',
    value: '0.8%',
    trend: 'down',
    trendPercent: '-25.0%',
    icon: '🧪',
    rawData: generateTrendData(0.8)
  }
];

async function seedMetrics() {
  try {
    console.log('Starting to seed metrics...');
    
    // First, clear existing metrics
    const existingDocs = await collections.metrics.get();
    if (!existingDocs.empty) {
      console.log('Clearing existing metrics...');
      const batch = db.batch();
      existingDocs.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
    
    // Add new metrics in batches of 500 (Firestore limit)
    const batchSize = 500;
    for (let i = 0; i < metrics.length; i += batchSize) {
      const batch = db.batch();
      const batchMetrics = metrics.slice(i, i + batchSize);
      
      for (const metric of batchMetrics) {
        const docRef = collections.metrics.doc();
        batch.set(docRef, {
          ...metric,
          timestamp: new Date().toISOString()
        });
      }

      await batch.commit();
      console.log(`Seeded batch of ${batchMetrics.length} metrics`);
    }

    console.log('Successfully seeded all metrics!');
    return true;
  } catch (error) {
    console.error('Error seeding metrics:', error);
    throw error;
  }
}

// Export the function to be called from seed.js
module.exports = seedMetrics();
