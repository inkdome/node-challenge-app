import mongoose from 'mongoose';
import winston from 'winston';
import config from 'config';

import Style from './style'
mongoose.connect(config.mongo.url, { useNewUrlParser: true })
  .then(() => winston.info('Connected to MongoDB'))
  .catch(err => winston.error(`MongoDB connection error: ${err}`));

exports.Style = Style
