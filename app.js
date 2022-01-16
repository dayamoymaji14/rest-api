const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');

const logger = require('./helpers/logger');
const routes = require('./routes/v1/routes');
const { error404, error } = require('./helpers/error');

// Initialized env
dotenv.config();

const app = express();
app.set('env', process.env.NODE_ENV);

app.use(express.json());
app.use(helmet());
app.use(logger);

// routing
app.use("/api", routes);

// 404 handler
app.use(error404);

// Error handler
app.use(error);

module.exports = app;