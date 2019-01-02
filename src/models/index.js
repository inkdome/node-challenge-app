import mongoose from 'mongoose';
import winston from 'winston';
import config from 'config';

mongoose.connect(config.mongo.url, { useNewUrlParser: true })
  .then(() => winston.info('Connected to MongoDB'))
  .catch(err => winston.error(`MongoDB connection error: ${err}`));

// TODO: add models
// exports.Style = require('./style');
// exports.Tattooer = require('./tattooer');
// exports.Ranking = require('./ranking');
