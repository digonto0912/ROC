const { saveMetricData } = require('../firebase/metricsService');

const metrics = {
  financial: [
    {
      title: "Revenue",
      value: "$128,400",
      trend: "up",
      trendPercent: "+12.5%",
      icon: "💰",
      data: Array.from({ length: 30 }, (_, i) => ({ value: Math.random() * 150000 }))
    },
    // ...more financial metrics
  ],
  // ...other categories and their metrics
};

async function seedMetrics() {
  try {
    for (const [category, metricsData] of Object.entries(metrics)) {
      console.log(`Seeding ${category} metrics...`);
      
      for (const metric of metricsData) {
        try {
          await saveMetricData(category, metric);
          console.log(`✓ Saved ${category} metric: ${metric.title}`);
        } catch (error) {
          console.error(`Failed to save ${category} metric: ${metric.title}`, error);
        }
      }
    }
    console.log('All metrics seeded successfully!');
  } catch (error) {
    console.error('Error seeding metrics:', error);
  }
}

seedMetrics();