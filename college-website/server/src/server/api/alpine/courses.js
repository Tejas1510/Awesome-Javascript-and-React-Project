const mysqlDao = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');

async function getcources(req, res) {
  let query = '';
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();

  try {

    query = "SELECT *FROM web_courses;";

    queryModel = await mysqlDao.executeQuery(query);
    logger.log(' Query : ' + query + 'Query Model : ' + JSON.stringify(queryModel));

    if (queryModel.status == 1) {
      resModel.status = 1;
      resModel.data = queryModel;
      resModel.info = queryModel.info;
    } else {
      resModel.status = -3;
      resModel.info = 'DB Query ERROR: ' + JSON.stringify(queryModel);
    }
  } catch (error) {
    resModel.status = -9;
    resModel.info = resModel.info + ': CATCH: ' + error;
  } finally {
    try { resModel.tat = (new Date().getTime() - startMS) / 1000 } catch (error) { }
  }

  return resModel;
}

async function getfees(body) {
  //generating query
  let query = '';
  
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();
 

  try {
      // reading query parameter from request


     query ="SELECT * FROM web_alpine_fees ;";
    // getting result from executing query
      queryModel = await mysqlDao.executeQuery(query);
      
      //checking result and setting the model accordingly
      if(queryModel.status == constants.SUCCESS){
          // updating model values
          resModel.status = queryModel.status;
          resModel.info = 'OK: DB Query: ' + queryModel.info + ' : ' + queryModel.tat + ' : ' + queryModel.message;
          resModel.data = queryModel;
      }else{
          resModel.status = constants.ERROR;
          resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
      }
      logger.log('test-api.js: (getQueryResult(req): ' + queryModel.info);

  } catch (error) {
      resModel.status = -33;
      resModel.info = 'catch : ' + resModel.info + ' : ' + error;
      logger.error(JSON.stringify(resModel));
  }finally{
    try{resModel.tat = (new Date().getTime() - startMS)/1000;}catch(error){}
  }
  //returning the model
  return resModel;
}

module.exports = {getfees, getcources };
