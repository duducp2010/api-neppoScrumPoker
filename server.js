const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const databaseConfig = require('./config/database');
const router = require('./app/routes');

mongoose.connect(databaseConfig.url);

const port = process.env.PORT || 8080;
app.listen(port);
console.log("Servidor rodando na porta: " + port );

app.use(bodyParser.urlencoded({extended: false})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

router(app);