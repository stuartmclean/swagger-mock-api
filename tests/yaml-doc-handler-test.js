'use strict';

var fs = require('fs'),
    should = require('should'),
    yaml = fs.readFileSync(__dirname + '/../swagger/swagger.yaml', 'utf8'),
    yamlDocHandler = require('../lib/yaml-doc-handler'),
    docHandler = new yamlDocHandler(yaml);


describe('allow object-like access to swagger files using $ref notation', function () {
    describe('getArrayForKey', function () {
        it('should find a simple key in the object', function () {
            var simpleObject = {'foo': {'bar': 'baz'}};
            docHandler.getArrayForKey('foo', simpleObject).should.eql({'bar': 'baz'});
        });

        it('should return an empty object if key does not exist', function () {
            var simpleObject = {'foo': 'bar'};
            var result = docHandler.getArrayForKey('baz', simpleObject);
            Object.keys(result).length.should.eql(0);
        });
    });

    describe('getArrayForMultipleKeys', function () {
        it('should recursively find keys in a simple object', function () {
            var simpleObject = {'foo': {'bar': 'baz'}};
            docHandler.getArrayForMultipleKeys(['foo', 'bar'], simpleObject).should.eql('baz');
        })
    });
})
