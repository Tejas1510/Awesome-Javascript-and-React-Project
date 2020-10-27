const logger = require('./logger');

async function throwExp(error) {
    logger.log('throwExp - ' + error);
    throw new Error('throwExp - ' + error);
}

module.exports = { throwExp };