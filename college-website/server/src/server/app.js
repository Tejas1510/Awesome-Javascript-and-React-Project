const express = require("express");
const bodyParser = require("body-parser");
const logger = require('./utils/logger');
const corsRouter = require('./middleware/cors');
const mainRouter = require('./router/router');
const authRouter = require('./middleware/auth');
const loggingRouter = require('./middleware/logging');
const config = require('./config/config');

// object for express server
const app = express();

try {
  // trusting proxy for IP details
  app.set('trust proxy', true);

  //using bodyparser for json data parsing
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  //initializing app config
  //config.initialize();

  //** Integrating CORS Middleware in Application
  logger.log('** Integrating CORS Middleware in Application');
  app.use(corsRouter.router);

  //** Integrating ACCESS Audit Middleware in Application
  logger.log('** Integrating Logging Middleware in Application');
  app.use(loggingRouter.router);

  //** Integrating Authentication Middleware in Application
  logger.log('** Integrating Authentication Middleware in Application');
  app.use(authRouter.router);

  //** Integrating All Routes in Application
  logger.log('** Integrating All Routes in Application');
  app.use(mainRouter.router);

  logger.log('** All Modules Integration Done');

} catch (error) {
  logger.error('app.js : ' + error);
  throw ('app.js : ' + error);
}


// *************** DO NOT ALTER THE BELOW CODE ***********************
//exporting app module for node express JS server
module.exports = app;
