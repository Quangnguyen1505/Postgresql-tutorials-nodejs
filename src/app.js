const express = require('express');
const app = express();
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')

//init dbs 
// const connect = require('./v1/databases/init.postgresql');
const initPostgresql = require('./v2/databases/init.postgresql');
initPostgresql.initPostgresql();

//user middleware
app.use(helmet())
app.use(morgan('combined'))
// compress responses
app.use(compression())

// add body-parser
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//router
app.use(require('./v2/routes/index.router'))
// Error Handling Middleware called

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});


// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
            stack: error.stack
        },
    });
});

module.exports = app;