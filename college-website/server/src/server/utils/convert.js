const logger = require('../utils/logger');

function ObjToArray(obj) {
    var arr = obj instanceof Array;

    return (arr ? obj : Object.keys(obj)).map(function (i) {
        var val = arr ? i : obj[i];
        
        if (typeof val === 'object')
            return ObjToArray(val);
        else
            return val;
    });
}

function convertIntoString(data) {
    let stringify = '';
    let result;
    let parse;
    let resultMain = '';
    try {
        stringify = JSON.stringify(data);
        
        result = stringify.replace(/\[/g, '(').replace(/]/g, ')');
       
        resultMain = result.substring(1, result.length-1);
       
        return resultMain;

    } catch (error) {
        logger.log('convertIntoString: ' + error);
    }
}

module.exports = { ObjToArray, convertIntoString };