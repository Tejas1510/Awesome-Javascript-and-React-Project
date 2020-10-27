const express = require('express');
const router = express.Router();
// const logger =  require('../utils/logger');

// setting CORS parameters
router.use((req, res, next) => {

  // Allowed domians
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Allowing credemtials
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Allowed Headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Length, Origin, X-Requested-With, Content-Type, Accept, x-access-token, authorization, token"
  );

  // Allowed Methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }

});

module.exports = { router };
