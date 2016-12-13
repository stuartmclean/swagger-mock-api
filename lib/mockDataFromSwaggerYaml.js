'use strict';

var yaml = require('js-yaml');

var mockDataFromSwaggerYaml = function () {
    var doc,
        id = 1;

    this.getMockData = function (swaggerYamlContent, pathName) {
        doc = yaml.safeLoad(swaggerYamlContent);

        if (typeof doc['paths']['/' + pathName] === 'undefined') {
            return [];
        }

        var rootObject = doc['paths']['/' + pathName]['get']['responses']['200']['schema']['properties']['data'],
            items = getArrayForKey('items', rootObject);

        return [
            getTestValuesForObject(items['properties'])
        ];
    };

    var getTestValuesForObject = function (object) {
        var response = {};
        for (var key in object) {
            if (!object.hasOwnProperty(key)) continue;

            var settings = getArrayForKey(key, object);
            response[key] = getTestValueForType(settings['type'], key, object);
        }
        return response;
    };

    var getArrayForKey = function (needle, haystack) {
        if (Object.keys(haystack[needle])[0] == '$ref') {
            var refsplit = haystack[needle]['$ref'].split('/');
            return doc[refsplit[1]][refsplit[2]];
        }
        return haystack[needle];
    };

    var getTestValueForType = function (typeName, key, object) {
        switch (typeName) {
            case 'integer':
                return id++;
            case 'number':
                if (typeof object[key]['maximum'] !== 'undefined') {
                    return object[key]['maximum'];
                } else if (typeof object[key]['format'] !== 'undefined'
                    && object[key]['format'] == 'float'
                ) {
                    return 0.14159 + id++;
                }
                return id++;
            case 'string':
                if (typeof object[key]['format'] !== 'undefined'
                    && object[key]['format'] == 'date'
                ) {
                    return '2016-01-01';
                } else if (typeof object[key]['description'] !== 'undefined'
                    && object[key]['description'] == 'time in format G:i'
                ) {
                    return '12:13';
                }
                return 'test string for ' + key;
            case 'boolean':
                return true;
            case 'array':
                var itemObject = getArrayForKey('items', object[key]);
                return [
                    getTestValuesForObject(itemObject['properties'])
                ];
            case 'object':
                return getTestValuesForObject(object[key]['properties']);
            default:
                return key;
        }
    }
};

module.exports = mockDataFromSwaggerYaml;
