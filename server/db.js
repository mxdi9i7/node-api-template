const mongoose = require('mongoose');
let isConnected;
const connectionString = 'mongodb+srv://admin:jjnn123@cluster0-tf4wf.mongodb.net/pwitter';

const connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }
  console.log('=> using new database connection');
  return mongoose
    .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => {
      isConnected = db.connections[0].readyState;
      console.log('Connection Success!');
    })
    .catch(e => {
      console.log(e);
    });
};

export default connectToDatabase;
