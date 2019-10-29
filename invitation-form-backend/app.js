const express = require('express');
const favicon = require('static-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config');
const http = require('http');
const logger = require('./config/logger/logger');
const { handleError } = require('./services/error');
// Custom Middleware Imports
const cors = require('./middleware/cors');
// API location
const api = require('./modules/api');
const app = express();

// view engine setup
app.set('view engine', 'jade');
app.use(favicon());

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(cors);
app.use('/api', api);

/// error handlers
app.use((err, req, res, next) => {
  handleError(err, res);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//Set Port
const port = process.env.PORT || '4000';
app.set('port', port);

const server = http.createServer(app);

mongoose
  .connect(config.mongoDBUrl, {
    useNewUrlParser: true
  })
  .then(() => {
    server.listen(port, () =>
      logger.info(`Running on ${process.env.HOST} : ${port}`)
    );
  });

module.exports = app;
