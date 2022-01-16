const morgan = require('morgan');

morgan.token('id', function getId(req) {
    return req.id
});
morgan.token('date', () => {
    return new Date().toLocaleString();
});
morgan.token('clientaddr', (req, res) => {
    return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
});

// Structure of the log
const loggerFormat = '- [:date[web]] ":method :url" :status (:clientaddr) :response-time';
const logger = morgan(loggerFormat);

module.exports = logger;