const monk = require('monk');
const db = monk(process.env.MONGO_URI);


module.exports = db;