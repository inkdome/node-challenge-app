import mongoose from 'mongoose';
import winston from 'winston';
import config from 'config';

import Style from './style'
import Tattooer from './tattooer'
import Ranking from './ranking'

mongoose.connect(config.mongo.url, { useNewUrlParser: true })
  .then(() => winston.info('Connected to MongoDB'))
  .catch(err => winston.error(`MongoDB connection error: ${err}`));

exports.Style = Style
exports.Tattooer = Tattooer
exports.Ranking = Ranking
