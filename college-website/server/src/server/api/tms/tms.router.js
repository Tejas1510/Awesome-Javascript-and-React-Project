const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger');
const constants = require('../../utils/constants');
let masterModel = require('../../models/master-model');

// file for testing API's
let tms = require('./tms');

//declarinfg Router for the express app
// ******************** DO NOT ALTER THE ABOVE CODE ***********************
// *************** // *************** // *************** // ***************

// ******************************************************************

// API for testing get request , executing the query
router.post("/tms/checkin", async (req, res) =>{
    res.status(constants.HTTP_OK).json({});
});

// API for testing get request , executing the query
router.post("/tms/checkout", async (req, res) =>{
    res.status(constants.HTTP_OK).json({});
});

// API for getting MD5 hash of the 
router.post("/tms/attendance", async (req, res) =>{
    res.status(constants.HTTP_OK).json({});
    
});

// *************** // *************** // *************** // ***************
// ****************** DO NOT ALTER THE BELOW CODE *************************
//exporting all Routes module for node express JS server
module.exports = {router};
