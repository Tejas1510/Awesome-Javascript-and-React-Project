const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const methods = require('../utils/methods');
const constants = require('../utils/constants');

// file for testing API's
const testApiRouter = require('../api/test/test-api.router');
const loginApiRouter = require('../api/login/login.router');
const tmsApiRouter = require('../api/tms/tms.router');
const alpineApiRouter = require('../api/alpine/alpine.router');
const contactForm = require('../api/contact/contact.router');
const transports = require('../api/transports/transports.router');
const covid = require('../api/covid/covid.router');
//declarinfg Router for the express app

// ******************** DO NOT ALTER THE ABOVE CODE ***********************
// *************** // *************** // *************** // ***************

// API for testing server avai;ability status
router.get("/status", async(req, res) => {
    res.status(constants.HTTP_OK).json({ status: "All is well :-)" });
});


//test API Router
router.use(testApiRouter.router);

//login API Router
router.use(loginApiRouter.router);

//TMS API Router
router.use(tmsApiRouter.router);

//Alpine API Router
router.use(alpineApiRouter.router);


//contactForm API Router
router.use(contactForm.router);

//Transports API Router
router.use(transports.router);

//Covid API Router
router.use(covid.router);
// *************** // *************** // *************** // ***************
// ****************** DO NOT ALTER THE BELOW CODE *************************
//exporting all Routes module for node express JS server
module.exports = { router };