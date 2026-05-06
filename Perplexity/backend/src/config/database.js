require("dotenv").config()
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Connection error:', err);
  }
}

module.exports = connectDB