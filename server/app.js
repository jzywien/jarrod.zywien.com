require('dotenv').config();

const _ = require('lodash');
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./api');
const validate = require('./validate');
const DISTDIR = path.join(__dirname, '../dist');

const app = express();

app.use(favicon(path.join( DISTDIR, 'favicon.ico')));
app.use(express.static(DISTDIR));
app.use('/', express.static(DISTDIR));

app.use(bodyParser.json());
app.use('/api', validate, api);

app.use((req, res) => {
  res.sendFile(path.join(DISTDIR, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});