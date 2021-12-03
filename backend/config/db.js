// db.js is config file for database

const mongoose = require('mongoose');

//  connectDB() is use for mongodb database confic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
};

// Export module as connectDB
module.exports = connectDB;
