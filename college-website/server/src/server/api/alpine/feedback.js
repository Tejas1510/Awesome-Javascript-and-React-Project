const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const dotenv = require('dotenv');
const convert = require('../../utils/convert');
dotenv.config();

const key = process.env.MASTER_KEY;

// GET DROP-DOWN PTM
async function getDropDownPTM(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request
        query = "SELECT DISTINCT ptm_id FROM `web_ptm_master`;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
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

// GET DROP-DOWN-COURSE
async function getDropDownCourse(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request
        query = "SELECT DISTINCT CONCAT(course, ' ', (TIMESTAMPDIFF(YEAR, admission_date, CURDATE()) + 1), ' ', 'Year') AS `course_year` FROM web_student_directory;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
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

// GET DROP-DOWN-STUDENT
async function getDropDownStudent(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request
        query = "SELECT   university_roll_no, university_sno, aadhar_no, gender, dob, CONCAT(first_name, ' ', last_name) AS `name`, CONCAT(course, ' ', (TIMESTAMPDIFF(YEAR, admission_date, CURDATE()) + 1), ' ', 'Year') AS `course_year` FROM `web_student_directory`;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
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

// GET PTM-AGENDA
async function getPTMAgenda(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    try {
        // reading query parameter from request
        query = "SELECT DISTINCT *FROM `web_ptm_master`;";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
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

// GET PTM-QUESTIONS
async function getPTMQuestions(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let ptm_id;
    try {
        ptm_id = body.ptm_id;

        query = "SELECT *FROM view_ptm_master  WHERE ptm_id = '" + ptm_id + "';";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);



        // 1. first check if query is executed properly to do so check the querymodel staus = 1
        if (queryModel.status == 1) {
            // now check if rows are fetcehd or not for that check fetcehd records
            if (queryModel.fetchedRows == 0) {
                throw 'No fetched Rows';
                // check status
            } else if (queryModel.rows[0].status == 'Active') {
                // new PTM ptm_master, question master view
                //new form feedback details view se aayengi
                //query 
                query = "SELECT *FROM view_ptm_master  WHERE ptm_id = '" + ptm_id + "';";
                queryModel = await mysqlDAO.executeQuery(query);
            } else if (queryModel.rows[0].status == 'Closed') {
                // closed PTM
                // closed form, non-editabe, submit disatb;e
                // ptm_details table
                // query 
                query = "SELECT *FROM view_ptm_feedback WHERE ptm_id = '" + ptm_id + "';";
                queryModel = await mysqlDAO.executeQuery(query);
            }
        } else {
            throw 'Query Model Status Error';
        }


        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
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

// GET FEEDBACK-DATA
async function getFeedbackData(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let ptm_name;
    let roll_no;
    try {
        ptm_name = body.ptm_name;
        roll_no = body.roll_no;


        // reading query parameter from request
        query = "SELECT question_order, ptm_id, employee_id, university_roll_no, teacher_feedback, parents_feedback, solution FROM web_ptm_details WHERE ptm_id = '" + ptm_name + "' AND university_roll_no = '" + roll_no + "';";

        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);

        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
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

// GET SUBMIT-FEEDBACK-DATA
async function submitFeedbackData(body) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryModel = masterModel.getQueryModel();
    let resModel = masterModel.getResponseModel();
    let payload;
    let convertedArray;
    let convertedString = '';
    let stringify = '';
    let question = [];
    let teacher_feedback = [];
    let parents_feedback = [];
    let solution = [];
    let values = '';

    try {
        // reading query parameter from request
        payload = body.payload;
        convertedArray = convert.ObjToArray(payload);
        convertedString = convert.convertIntoString(convertedArray);
        values = convertedString.replace(/\\/g, "");;
        logger.log('values:: ' + values);

        query = "INSERT INTO `web_ptm_details` (ptm_id, question_order, question," +
            "teacher_feedback, parents_feedback, solution, employee_id, university_roll_no) VALUES" +
            values +
            "ON DUPLICATE KEY UPDATE "

        +
        "question = VALUES(question), " +
        "teacher_feedback = VALUES(teacher_feedback), " +
        "parents_feedback = VALUES(parents_feedback), " +
        "solution = VALUES(solution)" +
        ";";


        logger.log('QUERY:: ' + JSON.stringify(query));
        // getting result from executing query
        queryModel = await mysqlDAO.executeQuery(query);


        //checking result and setting the model accordingly
        if (queryModel.status == constants.SUCCESS) {
            // updating model values
            resModel.status = queryModel.status;
            resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
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
module.exports = {
    submitFeedbackData,
    getDropDownStudent,
    getDropDownPTM,
    getDropDownCourse,
    getPTMAgenda,
    getPTMQuestions,
    getFeedbackData
};