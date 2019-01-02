import models from '../models';

module.exports.setRoutes = (app) => {
  app.get('/', (req, res) => {
    res.json({ status: 'ok' });
  });

  // TODO: add needed routes
};
