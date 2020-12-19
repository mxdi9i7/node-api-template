import mongoose from 'mongoose';
require('dotenv').config();

const connectionString = process.env.DB_CONNECTION_STRING;

let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }
  console.log('=> using new database connection');

  if (connectionString) {
    return mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((db) => {
        isConnected = db.connections[0].readyState;
        console.log('Connection Success!');
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    console.log('MongoDB url not set in environment variable');
  }
};

export default connectToDatabase;
