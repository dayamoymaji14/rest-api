const getData = require('../models/actions/getData');
const respond = require('../helpers/respond');
const schemaValidator = require('../helpers/schemaValidator');

/* 
* @desc Get all records according to the payload data
* @route GET /api/v1/records
*/
const getRecords = async (req, res, next) => {
    const requestData = req.body;

    try {
        // Validate the request body against the schema
        await schemaValidator('record', requestData);
    } catch (error) {
        return respond(res, 400, error, null);
    }

    try {
        const records = await getData(requestData);
        return respond(res, 200, 'success', records);
    } catch (error) {
        next(error);
    }
};  

module.exports = getRecords;