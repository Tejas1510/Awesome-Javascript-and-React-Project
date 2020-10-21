const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const jwt = require('../../utils/jwt');
const cryptoJS = require('../../utils/cryptoJS');
const dotenv = require('dotenv');
dotenv.config();

const key = process.env.CRYPTOJS_KEY;

async function getUserAttendance(payload) {
  //generating query
  let startMS = methods.getDTS();
  let query = '';
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();
  try {
      // reading query parameter from request
      
      if(query == null || query == ''){
          query = "SELECT CONCAT('DateTime= ',NOW(), ', VERSION= ', VERSION()) AS Info";
      }else if (query == 'undefined'){
          resModel.status = constants.ERR_UNDEFINED;
          resModel.info = "Query Paramater 'query' is undefined : " + query;
          throw new error("Query Paramater 'query' is undefined : " + query);
      }

      // getting result from executing query
      queryModel = await mysqlDAO.executeQuery(query);
      
      //checking result and setting the model accordingly
      if(queryModel.status == constants.SUCCESS){
          // updating model values
          resModel.status = queryModel.status;
          resModel.info = 'OK: DB Query: ' + queryModel.info;
          resModel.data = queryModel.rows;
      }else{
          resModel.status = constants.ERROR;
          resModel.info = 'ERROR: DB Query: ' + JSON.stringify(queryModel);
          resModel.data = {};
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

async function setCheckIN(req) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryResultModel = {};
    let model = masterModel.getResponseModel();
    let payload;
    let body;
    try {
        // reading query parameter from request
        query = req.body.query;
        
        if(query == null || query == ''){
            query = "SELECT CONCAT('DateTime= ',NOW(), ', VERSION= ', VERSION()) AS Info";
        }else if (query == 'undefined'){
            model.status = constants.ERR_UNDEFINED;
            model.info = "Query Paramater 'query' is undefined : " + query;
            throw new error("Query Paramater 'query' is undefined : " + query);
        }
  
        // getting result from executing query
        queryResultModel = await mysqlDAO.executeSelectQuery(query);
        
        //checking result and setting the model accordingly
        if(queryResultModel.status == constants.SUCCESS){
            // updating model values
            model.status = queryResultModel.status;
            model.info = 'OK: DB Query: ' + queryResultModel.info + JSON.stringify(queryResultModel);
            model.data = queryResultModel.data;
        }else{
            model.status = constants.ERROR;
            model.info = 'ERROR: DB Query: ' + JSON.stringify(queryResultModel);
            model.data = {};
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryResultModel.info);
  
    } catch (error) {
        model.status = -33;
        model.info = 'catch : ' + model.info + ' : ' + error;
        logger.error(JSON.stringify(model));
    }finally{
      try{model.tat = (new Date().getTime() - startMS)/1000;}catch(error){}
    }
    //returning the model
    return model;
}

async function setCheckOUT(req) {
    //generating query
    let startMS = methods.getDTS();
    let query = '';
    let queryResultModel = {};
    let model = masterModel.getResponseModel();
    try {
        // reading query parameter from request
        query = req.query.sqlquery;
        
        if(query == null || query == ''){
            query = "SELECT CONCAT('DateTime= ',NOW(), ', VERSION= ', VERSION()) AS Info";
        }else if (query == 'undefined'){
            model.status = constants.ERR_UNDEFINED;
            model.info = "Query Paramater 'query' is undefined : " + query;
            throw new error("Query Paramater 'query' is undefined : " + query);
        }
  
        // getting result from executing query
        queryResultModel = await mysqlDAO.executeSelectQuery(query);
        
        //checking result and setting the model accordingly
        if(queryResultModel.status == constants.SUCCESS){
            // updating model values
            model.status = queryResultModel.status;
            model.info = 'OK: DB Query: ' + queryResultModel.info + JSON.stringify(queryResultModel);
            model.data = queryResultModel.data;
        }else{
            model.status = constants.ERROR;
            model.info = 'ERROR: DB Query: ' + JSON.stringify(queryResultModel);
            model.data = {};
        }
        logger.log('test-api.js: (getQueryResult(req): ' + queryResultModel.info);
  
    } catch (error) {
        model.status = -33;
        model.info = 'catch : ' + model.info + ' : ' + error;
        logger.error(JSON.stringify(model));
    }finally{
      try{model.tat = (new Date().getTime() - startMS)/1000;}catch(error){}
    }
    //returning the model
    return model;
}


//exporting module for node express JS server router
module.exports = {getUserAttendance, setCheckIN, setCheckOUT };
