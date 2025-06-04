const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin
const initializeFirebaseAdmin = () => {
  try {
    const path = require('path');
    const serviceAccountPath = path.join(__dirname, 'roc-list-firebase-adminsdk-fbsvc-951e16e64c.json');
    const serviceAccount = require(serviceAccountPath);

    initializeApp({
      credential: cert(serviceAccount),
    });

    return getFirestore();
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
    throw error;
  }
};

const db = initializeFirebaseAdmin();

// Collection references
const collections = {
  metrics: db.collection('metrics'),
  kpiHistory: db.collection('kpi-history'),
  metricCalculations: db.collection('metric-calculations')
};

module.exports = {
  db,
  collections
};
