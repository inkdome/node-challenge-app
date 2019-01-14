import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import { setRoutes } from 'routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening port ${port}`));

setRoutes(app);

app.use((error, req, res, next) => {
  if (error instanceof Error) {
    res.setHeader('Content-Type', 'application/json')

    if (error.httpCode || error.message) {
      const httpCode = !isNaN(parseInt(error.httpCode)) ? error.httpCode : 500

      if (httpCode !== 500 || error.send) {
        // Code and message
        return res
          .status(error.httpCode)
          .send(error.message ? {
            error: error.message
          } : (
            error.body ? {
              error: error.body
            } : {}
          )
        )
      } else {
        // Message only, probably a Node error. Hide the message.
        console.log(error.message)
        return res.status(httpCode).send({})
      }
    }

    // No httpCode, no message
    console.log(error)
    return res.status(500).end()
  }

  next()
})
.use((req, res) => res.status(404).end())
