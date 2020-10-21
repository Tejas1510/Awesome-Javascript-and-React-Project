const express = require('express');
const router = express.Router();
const config = require('../config/config');
const logger = require('../utils/logger');
const methods = require('../utils/methods');
const cryptoJS = require('../utils/cryptoJS');
const constants = require('../utils/constants');
const masterModel = require('../models/master-model');
const jwt = require('../utils/jwt');
const dotenv = require('dotenv');
dotenv.config();

//setting response for all
router.use(async (req, res, next) => {
  let authorizationKey;
  let token;
  let model = masterModel.getResponseModel();
  let path = req.path;
  let jwtKey = '';
  let dateMySql;  //yyyy-mm-dd 2020-04-17
  let tokenExceptionPaths = ['/login', '/signup', '/test', 'alpine'];
  let skipJwtToken = false;
  try {
    
    authorizationKey = req.headers['authorization']; // Express headers are auto converted to lowercase
    token = req.headers['token']; // Express headers are auto converted to lowercase

    //validating token
    if (authorizationKey == '') {
      throw 'AUTH ERROR: BLANK Authentication Key paased in request: ' + authorizationKey;
    }
    if (authorizationKey == 'undefined') {
      throw 'AUTH ERROR: UNDEFINED Authentication Key paased in request: ' + authorizationKey;
    }
    if (!authorizationKey) {
      throw 'AUTH ERROR: No Authentication Key paased in request: ' + authorizationKey;
    }
    // formatting the token string
    if (authorizationKey.startsWith('Bearer ')) {
      authorizationKey = authorizationKey.slice(7, authorizationKey.length); // Remove Bearer from string
    }
    // formatting the token string
    if (authorizationKey.startsWith('Basic ')) {
      authorizationKey = authorizationKey.slice(6, authorizationKey.length); // Remove Basic from string
    }

    dateMySql = methods.getDateMySQL();
    let keyDateMySql = cryptoJS.MD5(dateMySql);

    // validating the authorization key
    if (authorizationKey != keyDateMySql) {
      throw 'AUTH ERROR: VALIDATION FAILED No Valid Authentication Key paased in request: ' + authorizationKey + ' : ' + keyDateMySql;
    }else{

    }

    // checking if path exists in exception list
    for (i = 0; i < tokenExceptionPaths.length; i++) {
      let exceptionpath = tokenExceptionPaths[i];
      if(path.startsWith(exceptionpath)){
        skipJwtToken = true;
      }
    }

    //Exception for paths
    //login page is excluded from checking the token
    if (skipJwtToken) {
      next();
    } else {
      // reading JWT KEY from env file
      jwtKey = process.env.MASTER_KEY;
      if (jwtKey == '') {
        throw 'AUTH ERROR: BLANK JWT KEY: proper value not read from env file!';
      }
      if (jwtKey == 'undefined') {
        throw 'AUTH ERROR: UNDEFINED JWT KEY: proper value not read from env file!';
      }
      // verifying the JST token
      let payload = jwt.getJwtPayload(token);
      // setting the response header
      let userID = payload.userID;
      let resToken = jwt.getJwtToken({ userID: userID, dt: new Date() });
      res.setHeader("token", resToken);
      next();
    }

  } catch (error) {
    model.status = constants.AUTH_ERROR;
    model.info = JSON.stringify(error);
    logger.log('auth: error:' + JSON.stringify(model));
    return res.status(constants.HTTP_UNAUTHORIZED).json(model);
  }

});

module.exports = { router };
