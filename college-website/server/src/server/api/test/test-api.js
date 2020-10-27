const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const jwt = require('../../utils/jwt');
const cryptoJS = require('../../utils/cryptoJS');
const dotenv = require('dotenv');
dotenv.config();

const key = process.env.MASTER_KEY;

async function getQueryResult(body) {
  //generating query
  let startMS = methods.getDTS();
  let query = '';
  let queryModel = masterModel.getQueryModel();
  let resModel = masterModel.getResponseModel();
  try {
      // reading query parameter from request
      query = body.query;
      
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

async function getJwtToken(body){

    let model = masterModel.getResponseModel();
    let token = '';
    try {
        
        token = jwt.getJwtToken(body);
        model.info = "SUCCESS";
        model.data = { input: body, output: token };
        model.status = 1;
    } catch (error) {
        model.status = -3;
        model.info = model.info + ": Error: " + error;
    }
    return model;
}

async function getJwtPayload(body){

    let model = masterModel.getResponseModel();
    let token = '';
    let payloadJson;
    try {
        
        token = body.token;
        payloadJson = jwt.getJwtPayload(token);
        model.info = "SUCCESS";
        model.status = 1;
        model.data = { input: token, output: payloadJson };
    } catch (error) {
        model.status = -3;
        model.info = model.info + ": Error: " + error;
    }
    return model;
}

async function encrypt(body){

    let model = masterModel.getResponseModel();
    let txt = '';
    let encrypt = '';
    try {

        txt = JSON.stringify(body);
        if(txt == 'undefined' || txt == null || txt == ''){
            throw 'Invalid Input data:' + txt;
        }
        encrypt = cryptoJS.encrypt(txt, key);
        model.status = 1;
        model.info = 'SUCCESS';
        model.data= { input: body, output: encrypt };
    } catch (error) {
        model.status = -3;
        model.info = model.info + ": encrypt: Error: " + error + ' : ' + JSON.stringify(model);
    }
    return model;
}

async function decrypt(body) {

    let model = masterModel.getResponseModel();
    let txt = '';
    let decrypt = '';
    try {
        txt = body;
        if(txt == 'undefined' || txt == null || txt == ''){
            throw 'Invalid Input data:' + txt;
        }

        //decrypting the txt
        //decrypt = myCrypto.decrypt(txt);
        decrypt = cryptoJS.decrypt(txt, key);
        logger.log(decrypt + ': ');
        decrypt = JSON.parse(decrypt);
        
        model.status = 1;
        model.info = 'SUCCESS';
        model.data={input: txt, output: decrypt};
    } catch (error) {
        model.status = -3;
        model.info = model.info + ": decrypt: Error: " + error;
        logger.error(JSON.stringify(model));
    }
    
    return model;
}

async function hashMD5(body){

    let model = masterModel.getResponseModel();
    let txt = '';
    let md5Hash = '';
    try {
        txt = JSON.stringify(body);
        if(txt == 'undefined' || txt == null || txt == ''){
            throw 'Invalid Input data:' + txt;
        }

        //hashing the txt MD5
        md5Hash = cryptoJS.MD5(txt);
        
        model.status = 1;
        model.info = 'SUCCESS';
        model.data={input: txt, output: md5Hash};
    } catch (error) {
        model.status = -3;
        model.info = model.info + ": md5: Error: " + error;
    }
    
    return model;
}

async function sendEmail(body) {

    let model = masterModel.getResponseModel();
    let token = '';
    let payload = '';
    try {
        
        
        model.info = "SUCCESS: " + JSON.stringify(payload) + ' : ' + token;
        model.status = 1;
        model.data = { input: body, output: "" };
    } catch (error) {
        model.status = -3;
        model.info = model.info + ": Error: " + error;
    }
    return model;
}

//exporting module for node express JS server router
module.exports = {getQueryResult, encrypt, decrypt, hashMD5, getJwtToken, getJwtPayload, sendEmail};
