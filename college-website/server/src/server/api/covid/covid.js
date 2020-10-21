const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const dotenv = require('dotenv');
dotenv.config();

async function getQnA(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();


    try {

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);


        query = "SELECT *FROM `covid_question_answer`;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            logger.log('QueryModel: ' + JSON.stringify(queryModel));
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

async function postAskQuestion(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let name;
    let contactNo;
    let cityOrTown;
    let district;
    let state;
    let askQuestion;
    let uniqueid;

    try {
        name = body.name;
        contactNo = body.contactNo;
        cityOrTown = body.city;
        district = body.district;
        askQuestion = body.question;

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        query = "INSERT INTO `covid_ask_form` (`name`, `contact_no`, `city_or_town`, `district`, `ask_question`) VALUES('" +
            name + "','" + contactNo + "','" + cityOrTown + "','" + district + "','" + askQuestion + "');";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            logger.log('QueryModel: ' + JSON.stringify(queryModel));
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}

async function getAnswer(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let Contactno;

    try {
        Contactno = body.contactNo;
        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);


        query = "SELECT `name`, `ask_question`, `answer` FROM `covid_ask_form` WHERE `contact_no` = '" + Contactno + "';";

        // getting result from executing query  
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
            logger.log('QueryModel: ' + JSON.stringify(queryModel));
            resModel.data = queryModel;
        } else {
            resModel.status = constants.ERROR;
            resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

    } catch (error) {
        resModel.status = -33;
        resModel.info = 'catch : ' + resModel.info + ' : ' + error;
        logger.error(JSON.stringify(resModel));
    } finally {
        try { resModel.tat = (new Date().getTime() - startMS) / 1000; } catch (error) {}
    }
    //returning the model
    return resModel;
}
//exporting module for node express JS server router
module.exports = { getQnA, getAnswer, postAskQuestion };