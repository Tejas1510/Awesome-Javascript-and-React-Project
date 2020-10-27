const cryptoJS = require('crypto-js');
const logger = require('./logger');

function encrypt(text, key){
    let keyutf;
    let iv;
    let enc;
    let encStr;
    try {
        if(key == null || key == 'undefined' || key == ''){
            throw 'Invalid CryptoJS Key : ' + key;
        }
        keyutf = cryptoJS.enc.Utf8.parse(key);
        iv = cryptoJS.enc.Base64.parse(key);
        enc = cryptoJS.AES.encrypt(text, keyutf, { iv: iv });
        encStr = enc.toString();
        return encStr;       
    } catch (error) {
        logger.log(error);
        throw 'encrypt:' + error;
    }
}

function decrypt(text, key){
    let keyutf;
    let iv;
    let encStr;
    let dec;
    let decStr;
    try {
        if(key == null || key == 'undefined' || key == ''){
            throw 'Invalid CryptoJS Key : ' + key;
        }
        keyutf = cryptoJS.enc.Utf8.parse(key);
        iv = cryptoJS.enc.Base64.parse(key);
        encStr = cryptoJS.enc.Base64.parse(text);
        dec = cryptoJS.AES.decrypt({ciphertext: encStr}, keyutf, {iv: iv});
        decStr = cryptoJS.enc.Utf8.stringify(dec);
        return decStr;
    } catch (error) {
        logger.log('decrypt:' + error);
        throw 'decrypt:' + error;
    }
}

function MD5(text){
    let key = '';
    try {
        key = cryptoJS.MD5(text);
        return key + '';
    } catch (error) {
        logger.log('hashMD5:' + error);
        throw 'md5:' + error;
    }
}

// 
module.exports = { encrypt, decrypt, MD5 };