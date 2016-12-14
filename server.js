var express = require('express'),
    fs = require('fs'),
    mockDataProvider = require('./lib/mockDataFromSwaggerYaml'),
    yamlDocHandler = require('./lib/yamlDocHandler'),
    app = express(),
    port = process.env.PORT || 8080,
    file = process.env.FILE || './swagger/swagger.yaml';

if (!fs.existsSync(file)) {
    console.log(file + ' does not exist');
    process.exit(1);
}

app.get('/', function (req, res) {
   res.send(
       'Mock api is running, but there\s nothing here!'
        + 'try an api path from your swagger file e.g. "/vendor"'
   );
});

app.get('/:api', function (req, res) {
    var yamlString = fs.readFileSync(file, 'utf8'),
        docHandler = new yamlDocHandler(yamlString),
        dataProvider = new mockDataProvider(docHandler);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(dataProvider.getMockData(req.params.api)));
});

app.listen(port, function () {
    console.log('running on port ' + port);
});

