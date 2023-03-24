import mongoose from 'mongoose';

export const Connect = (url = {}) => {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const Database = mongoose.connection;

  Database.on('error', console.error.bind(console, 'Connection error:'));
  Database.once('open', () => console.log('Connected to MongoDatabase!'));
};