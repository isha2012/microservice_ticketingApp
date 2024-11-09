// db.js
import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return mongoose.connection;
  }

  console.log('=> Creating new database connection');
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ticketing_app';

  try {
    await mongoose.connect(mongoURI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('=> Successfully connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}


//for kubernetes connection url:::: await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

