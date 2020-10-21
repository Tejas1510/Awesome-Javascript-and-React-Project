let jwt = require('jsonwebtoken');
let logger = require('./logger');
const dotenv = require('dotenv');
const constants = require('./constants');
dotenv.config();

//reading JWT key from .env file
const jwtKey = process.env.MASTER_KEY;

function getJwtToken(payLoad) {
    let jwtExpiresInSec = 900; //default token is valid for 15 minutes
    let token = '';

    try {
        try {
            let tmp = process.env.JWT_TIME_OUT_SECONDS;
            jwtExpiresInSec = parseInt(tmp.trim(), 10);
        } catch (error) {
            logger.log('getJwtToken: Error in setting jwtExpiresInSec time, setting default to 15 minutes(900 sec) : ' + error);
            jwtExpiresInSec = 900;
        }

        //generating jwt toen for authentication
        token = jwt.sign(
            payLoad,
            jwtKey,
            { expiresIn: jwtExpiresInSec }  // this needs to be numeric value only in seconds
        );

        return token;
    } catch (error) {
        throw 'getJwtToken: ' + error;
    }
}

function getJwtPayload(token) {
    let payload;
    try {

        //validating token
        if (token == '') {
            throw 'AUTH ERROR: BLANK: JWT token paased in request';
        }
        if (token == 'undefined') {
            throw 'AUTH ERROR: UNDEFINED: JWT token paased in request';
        }
        if (!token) {
            throw 'AUTH ERROR: NO JWT token paased in request';
        }

        if (jwtKey == '') {
            throw 'Blank JWT KEY, proper value not read from env file!';
        }
        if (jwtKey == 'undefined') {
            throw 'undefined JWT KEY, proper value not read from env file!';
        }

        // verifying the JST token
        jwt.verify(token, jwtKey, (err, decoded) => {

            if (err) {//error in verifying the token
                throw JSON.stringify(err);
            } else { //token verified successfully
                payload = decoded;
            }
        });

        // token verification success
        let payLoadString = JSON.stringify(payload);
        if(payLoadString == '' || payLoadString == null || payLoadString == 'undefined'){
            throw 'Error in Decoded string : ' + payLoadString;
        }else{
            return payload;
        }
        

    } catch (error) {
        logger.error('getJwtPayload: ' + error);
        throw error;
    }
}

module.exports = { getJwtToken, getJwtPayload };