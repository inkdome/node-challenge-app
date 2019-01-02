import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  mongo: {
    url: process.env.MONGODB_URI,
  },
};
