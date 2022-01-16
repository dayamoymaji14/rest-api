const joiErrorFormatter = require('joi-error-formatter');

const recordSchema = require('../schema/recordSchema');

// Validate the request body against the schema
const schemaValidator = async (type, data) => {
    try {
        switch (type) {
            case 'record':
                await recordSchema.validateAsync(data);
                break;
            default:
                throw joiErrorFormatter(new Error('Invalid schema type'));
        }

    } catch (error) {
        throw joiErrorFormatter(error);
    }
};

module.exports = schemaValidator;