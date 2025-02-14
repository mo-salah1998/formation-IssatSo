
require('dotenv').config(); 
const mongoose = require('mongoose');

const databaseConfig = async () => {
  try {
    mongoose.set('strictQuery', false);

    const dbURI = process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE : process.env.DEV_DATABASE;

    if (!dbURI) {
      throw new Error('Database URI is undefined. Check your .env file.');
    }

    await mongoose.connect(dbURI);

    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error.message); 
  }
};

module.exports = databaseConfig; // Exportation en CommonJS
