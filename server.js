#!/usr/bin/env node
'use strict';

var express = require('express'),
    opts = require('commander')
        .version('0.0.2')
        .option('-f, --file [fileName]')
        .option('-d, --delay <n>', 'delay in ms before response', parseInt)
        .option('-p, --port <n>', 'port address - default is 8080', parseInt)
        .option('-s, --status <n>', 'status code - default is 200', parseInt)
        .parse(process.argv),
    mockApi = require('./lib/mock-api'),
    fs = require('fs'),
    app = express(),
    filePath = (typeof opts.file !== 'undefined') ? opts.file : './swagger/swagger.yaml',
    delay = (opts.delay === parseInt(opts.delay, 10)) ? opts.delay : 0,
    port = (opts.port === parseInt(opts.port, 10)) ? opts.port : 8080,
    status = (opts.status === parseInt(opts.status, 10)) ? opts.status : 200;

if (!fs.existsSync(filePath)) {
    console.log(filePath + ' does not exist');
    process.exit(1);
}

app.get('/', function (req, res) {
    sendDataUsingTimeout({"info": mockApi.getEmptyPathText()}, res);
});

app.get('/:api', function (req, res) {
    sendDataFromSwagger(req, res)
});

app.post('/:api', function (req, res) {
    sendDataFromSwagger(req, res)
});

app.listen(port, function () {
    console.log(
        'running on port ' + port
        + (delay > 0 ? ' with response delay of ' + delay : '')
        + (status !== 200 ? ' will return error code ' + status : '')
    );
});

/**
 * @param req
 * @param res
 */
function sendDataFromSwagger(req, res) {
    sendDataUsingTimeout(mockApi.getPathObject(req.params.api, filePath), res);
}

/**
 * @param {Object} data
 * @param res
 */
function sendDataUsingTimeout(data, res) {
    setTimeout(function () {
        res.status(status);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(data));
    }, delay);
}


