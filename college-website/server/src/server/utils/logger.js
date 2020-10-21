const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
let fileLog = true;

function writeLog(message, logType) {
    const currentDate = new Date();
    const yyyy = currentDate.getFullYear();
    let mm = currentDate.getMonth() + 1;
    let dd = currentDate.getDate();
    let hh = currentDate.getHours();
    let min = currentDate.getMinutes();
    let ss = currentDate.getSeconds();
    let ms = currentDate.getMilliseconds();
    let today;
    let logFileName = '';
    try {

        //check for file log
        try {
            if ((process.env.FILE_LOG).toUpperCase() == 'DISABLED') {
                fileLog = false;
            }
        } catch (error) { }

        //
        if (dd < 10) { dd = `0${dd}`; }
        //
        if (mm < 10) { mm = `0${mm}`; }
        //
        if (hh < 10) { hh = `0${hh}`; }
        //
        if (min < 10) { min = `0${min}`; }
        //
        if (ss < 10) { ss = `0${ss}`; }
        //
        if (ms < 10) { ms = `00${ms}`; }
        if (ms < 100) { ms = `0${ms}`; }

        //
        today = yyyy + '' + mm + '' + dd + ':' + hh + '' + min + '' + ss + '.' + ms;
        logFileName = 'logs/' + yyyy + '' + mm + '' + dd + '.log';

        if (logType == '') {
            logType = 'INFO';
        }

        // printing log on console
        console.log(today + ': ' + logType + ': ' + message);

        if(fileLog) {
            //writing log in file
            try {
                // checking for log folder
                if (!fs.existsSync('logs/')) {
                    fs.mkdirSync('logs/')
                }

                let logFile = fs.createWriteStream(logFileName, { flags: 'a' });
                logFile.write(today + ': ' + logType + ': ' + message + '\n');
                logFile.end();
            } catch (error) {
                console.log(new Date() + ': logger/writeLog: Error in Writing log to File : ' + error + ' : ' + message);
            }
        }

    } catch (error) {
        console.log(new Date() + ': logger/writeLog: Catch: ' + error + ' : ' + message);
    }
}

function log(message) {
    try {
        writeLog(message, 'LOG');
    } catch (error) {
        console.log(new Date() + ': logger/log: Catch: ' + error + ': ' + message);
    }
}

function error(message) {
    try {
        writeLog(message, 'ERROR');
    } catch (error) {
        console.log(new Date() + ': logger/error: Catch: ' + error + ': ' + message);
    }
}

function info(message) {
    try {
        writeLog(message, 'INFO');
    } catch (error) {
        console.log(new Date() + ': logger/info: Catch: ' + error + ': ' + message);
    }
}

module.exports = { log, error, info };