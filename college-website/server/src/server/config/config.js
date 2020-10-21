const express = require('express');
const mysqlDAO = require('../db/mysqlDao');
const cryptoJS = require('../utils/cryptoJS');
const logger = require('../utils/logger');
const methods = require('../utils/methods');
const masterModel = require('../models/master-model');
const constants = require('../utils/constants');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const nonTokenPaths = [];
const globalParam = {};
//

async function initialize() {
    globalParam = await getGlobalParameters();
    nonTokenPaths = await getNonAuthPath();
    return true;
}

async function getGlobalParameters() {
    let param;
    const query = 'select `property`, `value` from gt_config';
    try {
        // getting result from executing query
      let results = await mysqlDAO.executeQuery(query);
      for(item in results.rows){
        key = item.property;
        value = item.value;
        param[key] = value;
      }
      return param;
        
    } catch (error) {
        throw error;
    }
}

//
async function getNonAuthPath() {
    let path = [];
    const query = 'select `path` from gt_non_jwt_path';
    try {
        // getting result from executing query
      let results = await mysqlDAO.executeQuery(query);
      for(item in results.rows){
        path.push(item.path);
      } 
      return path;
    } catch (error) {
        throw error;
    }
}

// 
module.exports = { nonTokenPaths, globalParam, initialize };