const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger');
const constants = require('../../utils/constants');
const jwt = require('../../utils/jwt');
const masterModel = require('../../models/master-model');

// file for testing API's
let loginApi = require('./login');
let teacherLoginApi = require('./teacherLogin');
//declarinfg Router for the express app
// ******************** DO NOT ALTER THE ABOVE CODE ***********************
// *************** // *************** // *************** // ***************

// API for LOGIN/SIGNIN
router.post("/login", async (req, res) => {
    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await loginApi.login(payload);

        //setting authorization header of response
        //generating jwt token for authentication// need to pass payload Json
        let userID = payload.username;
        token = jwt.getJwtToken({ userID: userID, dt: new Date() });
        if (token == '' || token == null || token == 'undefined') {
            throw 'Not able to generate token for authentication, contact system admin!';
        } else {
            //setting authorization header of response
            res.setHeader("token", token);
        }

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});



//API for SIGNUP
router.post("/signup", async (req, res) => {
    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //
        
        resModel = await loginApi.signup(payload);
        
        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});

// API for Teacher Login
router.post("/login/teacher", async (req, res) => {
    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await teacherLoginApi.teacherLogin(payload);

        //setting authorization header of response
        //generating jwt token for authentication// need to pass payload Json
        let userID = payload.username;
        token = jwt.getJwtToken({ userID: userID, dt: new Date() });
        if (token == '' || token == null || token == 'undefined') {
            throw 'Not able to generate token for authentication, contact system admin!';
        } else {
            //setting authorization header of response
            res.setHeader("authorization", token);
        }

        // **** dont change below code, write your code baove this only **** //
    } catch (error) {
        resModel.status = -9;
        resModel.info = 'catch: ' + error + ' : ' + resModel.info;
        logger.error(req.path + ' : ' + JSON.stringify(resModel));
    } finally {
        resModel.endDT = new Date();
        resModel.tat = (new Date().getTime() - startMS) / 1000;
        res.status(constants.HTTP_OK).json(resModel);
    }
});
// *************** // *************** // *************** // ***************
// ****************** DO NOT ALTER THE BELOW CODE *************************
//exporting all Routes module for node express JS server
module.exports = { router };
