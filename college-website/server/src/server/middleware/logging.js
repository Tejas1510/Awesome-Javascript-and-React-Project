const express = require('express');
const router = express.Router();
const logger =  require('../utils/logger');

// setting CORS parameters
router.use((req, res, next) => {

    try {
        logger.log('baseUrl=' + req.baseUrl + ': body=' + JSON.stringify(req.body) + ': cookies=' + req.cookies + ': fresh=' 
        + req.fresh + ': hostname=' + req.hostname + ': ip=' + req.ip + ': ips=' + req.ips + ': originalUrl=' 
        + req.originalUrl + ': params=' + JSON.stringify(req.params) + ': path=' + req.path + ': protocol=' 
        + req.protocol + ': query=' + JSON.stringify(req.query) + ': route=' + req.route + ': secure=' 
        + req.secure + ': signedCookies=' + req.signedCookies + ': stale=' + req.stale + ': subdomains=' 
        + req.subdomains + ': xhr=' + req.xhr);
    } catch (error) {
        logger.log('logging.js: ' + error);
    }

    next();
});

module.exports = {router};
