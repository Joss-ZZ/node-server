const express = require('express');
const app = express();

app.use(require('./auth'));
app.use(require('./usuario'));
app.use(require('./nota'));

module.exports = app;