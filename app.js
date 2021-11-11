const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/game.routes');

app.set('view engine', 'ejs')
app.use(router);
app.use(express.static(path.join(__dirname, 'client')));

module.exports = app;