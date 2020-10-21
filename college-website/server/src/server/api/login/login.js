
let mysqlDao = require('../../db/mysqlDao');
let masterModel = require('../../models/master-model');
let logger = require('../../utils/logger');
const dotenv = require('dotenv');
const constants = require('../../utils/constants');
dotenv.config();

const key = process.env.CRYPTOJS_KEY;

async function login(payload) {
  let startMS = new Date().getTime();
  let userID = '';
  let passwd = '';
  let query = '';
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();

  try {
    userID = payload.username;
    passwd = payload.password;

    logger.log(userID + ' : ' + passwd);
    if (userID == 'undefined' || userID == null || userID == '') {
      throw 'Invalid userID:' + userID;
    }

    if (passwd == 'undefined' || passwd == null || passwd == '') {
      throw 'Invalid passwd:' + passwd;
    }

    query = "UPDATE `gt_login` SET `last_login_success` = CURRENT_TIMESTAMP(), `failed_login_attempt`= 0, "
      + " remarks= 'Login Update Query Success' WHERE `user_id` = '" + userID + "' AND `password` = '" + passwd + "'  "
      + " AND `status` = 'Active'";

    //executing query
    queryModel = await mysqlDao.executeQuery(query);
    // check if query is executed successfully
    if (queryModel.status != 1) {
      throw 'Error/Issue with DB user login query: ' + queryModel.info;
    }
    // check if only one and only one record is fetcehd from server for the user
    if (queryModel.affectedRows != 1) {
      throw 'Multiple or No Record Found for user login query: ' + queryModel.info  + ' : ' + userID;
    }

    //executing query
    query = "select * from gt_user where user_id = '" + userID + "'";
    queryModel = await mysqlDao.executeQuery(query);
    // check if query is executed successfully
    if (queryModel.status != 1) {
      throw 'Error/Issue with DB user details query: ' + queryModel.info;
    }
    // check if only one and only one record is fetcehd from server for the user
    if (queryModel.fetchedRows <= 0) {
      throw 'No Record Found for user details query: ' + queryModel.info + ' : ' + userID;
    }

    resModel.info = 'SUCCESS: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
    resModel.data = queryModel;
    resModel.status = 1;
    
  } catch (error) {
    resModel.status = -9;
    resModel.info = 'catch: ' + error + ' : ' + resModel.info;
  }
  return resModel;
}

async function signup(payload) {
  let startMS = new Date().getTime();
  let userID = '';
  let passwd = '';
  let email = '';
  let query = '';
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();

  try {
    userID = payload.username;
    passwd = payload.password;

    if (userID && passwd && email) {
      query = "insert into gt_login (user_id, passwd) values('" + userID + "','" + passwd + "'))";
      queryModel = await mysqlDao.executeQuery(query);

      if (queryModel.status == 1 && queryModel.changedRows == 1) {
        resModel.status = 1;
        resModel.info = 'SUCCESS: ' + queryModel.info;
      } else {
        resModel.status = -3;
        resModel.info = 'DB Query ERROR: ' + JSON.stringify(queryModel);
      }
    } else {
      throw 'Invalid Username or Password';
    }

  } catch (error) {
    resModel.status = -9;
    resModel.info = resModel.info + ': Catch: ' + error;
  }
  return resModel;
}

// exporting module
module.exports = { login, signup };