const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin
const serviceAccountPath = path.join(__dirname, 'roc-list-firebase-adminsdk-fbsvc-951e16e64c.json');
const serviceAccount = require(serviceAccountPath);

// Initialize the app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get Firestore instance
const db = admin.firestore();

// Collection references
const collections = {
  metrics: db.collection('metrics')
};

module.exports = {
  db,
  collections
};
