const constants = require('./constants');
const req = require('request');
const jwt = require('./jwt');
const masterModel = require('../models/master-model');

function sendEmail(emailModel) {
    // below code reamins intact;
    let token = '';
    try {
        req.post();


        
    } catch (error) {
        res.status(constants.HTTP_OK).json({'sendResponse': error});
    }
}


//exporting all Routes module for node express JS server
module.exports = {sendEmail};