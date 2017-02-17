'use strict';

var fs = require('fs'),
    should = require('should'),
    mockDataProvider = require('../lib/mock-data-from-swagger-yaml'),
    yaml = fs.readFileSync(__dirname + '/../swagger/swagger.yaml', 'utf8'),
    yamlDocHandler = require('../lib/yaml-doc-handler'),
    docHandler = new yamlDocHandler(yaml),
    provider = new mockDataProvider(docHandler);

/**
 * integration test
 */
describe('mock data from swagger yaml', function () {
    describe('getMockData', function () {
        it('should return an empty object when the path-name does not exist in the yaml file', function () {
            provider.getMockData('foo').should.eql([]);
        });

        it('should return an object with test values when the path-name exists', function () {
            var expectedData = JSON.parse(fs.readFileSync(__dirname + '/expected-response.json'));
            provider.getMockData('vendor').should.eql(expectedData["data"]);
        });
    })
})
