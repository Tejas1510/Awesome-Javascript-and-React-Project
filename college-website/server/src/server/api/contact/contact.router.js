const express = require('express');
const router = express.Router();
const logger = require('../../utils/logger');
const constants = require('../../utils/constants');
const masterModel = require('../../models/master-model');

// file for testing API's
let contactJS = require('./contact');


//declarinfg Router for the express app
// ******************** DO NOT ALTER THE ABOVE CODE ***********************
// *************** // *************** // *************** // ***************

// API for contact form 
router.post("/test/alpine/contactform", async (req, res) => {

    // getting response model
    let startMS = new Date().getTime();
    let payload;
    let resModel = masterModel.getResponseModel();
    try {
        payload = req.body;
        // **** dont change above code, please wtite your router code below **** //

        resModel = await contactJS.contactForm(payload);

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
