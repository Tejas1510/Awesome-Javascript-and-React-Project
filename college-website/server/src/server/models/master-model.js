const constants = require('../utils/constants');

//  Function to get Model for API Response
function getResponseModel() {
    let model = {
        status: constants.ZERO,
        info: '',
        startDT: new Date(),
        endDT: new Date(),
        tat: constants.ZERO,
        data: {}
    }
    return model;
}

//  Function to get Model for DB Query Result
function getQueryModel() {
    let model = {
        affectedRows: 0,
        changedRows: 0,
        fieldCount: 0,
        insertId: 0,
        message: "",
        protocol41: true,
        serverStatus: 0,
        warningCount: 0,
        status: constants.ZERO,
        fetchedRows: constants.ZERO,
        rows: {},
        info: '',
        startDT: new Date(),
        endDT: new Date(),
        tat: constants.ZERO
    }
    return model;
}

function getUserModel(){

    let model = {
        
        userID: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        created_by: '',

    }
    return model;
}

function getEmailModel(){
    let model = {
        to: [],
        cc: [],
        bcc: [],
        subject: '',
        body: '',
        attachment: []
    }
    return model;
}

module.exports = { getResponseModel, getQueryModel, getUserModel, getEmailModel };

