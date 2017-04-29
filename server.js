const express = require('express');
const app = express();
const compression = require('compression');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConfig = require('./config/database');
const router = require('./app/routes');

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
app.use(compression());

mongoose.connect(dbConfig.url);
router(app);

//Iniciando o Servidor (Aplicação)
app.listen(port);
console.log("Servidor rodando na porta: " + port);