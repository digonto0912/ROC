require('dotenv').config();

async function runSeed() {
  try {
    console.log('Starting database seeding...');
    await require('./scripts/seedMetrics');
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
