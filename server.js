#!/usr/bin/env node
'use strict';

var express = require('express'),
    opts = require('commander')
        .version('0.0.1')
        .option('-d, --delay <n>', 'delay in ms before response', parseInt)
        .option('-f, --file [fileName]')
        .parse(process.argv),
    mockApi = require('./lib/mock-api'),
    fs = require('fs'),
    app = express(),
    port = process.env.PORT || 8080,
    filePath = (typeof opts.file !== 'undefined') ? opts.file : './swagger/swagger.yaml';

if (!fs.existsSync(filePath)) {
    console.log(filePath + ' does not exist');
    process.exit(1);
}

app.get('/', function (req, res) {
    setTimeout(function () {
        res.send(mockApi.getEmptyPathText());
    }, opts.delay);
});

app.get('/:api', function (req, res) {
    setTimeout(function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(mockApi.getPathObject(req.params.api, filePath)));
    }, opts.delay);
});

app.listen(port, function () {
    if (opts.delay !== parseInt(opts.delay, 10)) {
        opts.delay = 0;
    }

    console.log(
        'running on port ' + port + (opts.delay > 0 ? ' with response delay of ' + opts.delay : '')
    );
});
