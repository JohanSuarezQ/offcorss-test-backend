const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/offcorss-dashboard';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});