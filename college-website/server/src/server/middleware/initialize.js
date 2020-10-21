const express = require('express');
const cryptoJS = require('../utils/cryptoJS');
const logger = require('../utils/logger');
const methods = require('../utils/methods');
const masterModel = require('../models/master-model');
const constants = require('../utils/constants');
const router = express.Router();
const dotenv = require('dotenv');
let jwt = require('jsonwebtoken');

dotenv.config();

//setting response for all
router.use((req, res, next) => {
  

  try {




  } catch (error) {
    logger.error(error);
  }

});

module.exports = { router };
