const logger = require('./logger');
let fs = require('fs');

// 
function write(path, data){

    try {
        fs.writeFile(path, data, (err) => {
            if (err){
                logger.error('file-sys: writeFile: ' + error);
            }

            logger.log("Successfully Written to File.");
        });




    } catch (error) {
        logger.error('file-sys: write: ' + error);
    }
}