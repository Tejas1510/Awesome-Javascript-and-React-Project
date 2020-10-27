const mysqlDAO = require('../../db/mysqlDao');
const logger = require('../../utils/logger');
const methods = require('../../utils/methods');
const masterModel = require('../../models/master-model');
const constants = require('../../utils/constants');
const myCrypto = require('../../utils/my-crypto');
const jwt = require('../../utils/jwt');

function create(payload){
    
    let data;
    try {
        
        data = myCrypto.decrypt(payload);



    } catch (error) {
        logger.log(': ' + error);
    }
}

function read(payload){
    
    let data;
    try {
        
        data = myCrypto.decrypt(payload);



    } catch (error) {
        logger.log(': ' + error);
    }
}