const Joi = require('joi');

const recordSchema = Joi.object().options({ abortEarly: false }).keys({
    startDate: Joi.date().iso().required().error(new Error('Valid startDate is required')),
    endDate: Joi.date().iso().required().error(new Error('Valid endDate is required')),
    minCount: Joi.number().required().error(new Error('Valid minCount is required')),
    maxCount: Joi.number().required().error(new Error('Valid maxCount is required')),
}).unknown(true);;

module.exports = recordSchema;