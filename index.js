const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const winston = require("winston");
const { printf } = winston.format;
const expressWinston = require("express-winston");
const { loggerOptions } = require('./src/core/logger');
const port = 3000;

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  apis: ['./src/lib/*/routes/*route.js'],
  //apis: ['./src/lib/garbage/routes/garbage.route.js'],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Garbage can API",
      version: "1.0.0",
      description: "A simple Express Library API",
      servers: [
        { url: `http://localhost:${port}` }
      ],
    }
  }
}

const specs = swaggerJsDoc(options);

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(specs));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const es = require("elasticsearch");
const client = es.Client({ host: "http://localhost:9200" });

const garbageRoutes = require("./src/lib/garbage/routes/garbage.route");

client
  .ping()
  .then((res) => console.log("connection success", res))
  .catch((err) => console.error("wrong connection", err));

app.use(expressWinston.logger(loggerOptions));

app.use("/garbage", garbageRoutes);

app.get("/status", (req, res) => {
  res.send(`[${new Date().toJSON()}] server is up`);
});

app.listen(port, () => {
  console.log(` ----> Garbage-can app listening at http://localhost:${port}`);
});

module.exports = app;