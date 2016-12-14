'use strict';

var yaml = require('js-yaml');

/**
 * @param {yamlDocHandler} docHandler
 */
var mockDataFromSwaggerYaml = function (docHandler) {
    /** @param {int} id - incremented for each int value in mock response **/
    var id = 1;

    /**
     * @param {string} pathName
     * @returns {*}
     */
    this.getMockData = function (pathName) {
        var doc = docHandler.getDoc();

        if (typeof doc['paths']['/' + pathName] === 'undefined') {
            return [];
        }

        var rootObject = doc['paths']['/' + pathName]['get']['responses']['200']['schema']['properties']['data'],
            items = docHandler.getArrayForKey('items', rootObject);

        return [
            getTestValuesForObject(items['properties'])
        ];
    };

    /**
     * @param {*} object
     * @returns {{}}
     */
    var getTestValuesForObject = function (object) {
        var response = {};
        for (var key in object) {
            if (!object.hasOwnProperty(key)) continue;

            var settings = docHandler.getArrayForKey(key, object);
            response[key] = getTestValueForType(key, settings);
        }
        return response;
    };

    /**
     * @param {string} key
     * @param {*} settings
     * @returns {*}
     */
    var getTestValueForType = function (key, settings) {
        switch (settings['type']) {
            case 'integer':
                return id++;
            case 'number':
                if (typeof settings['maximum'] !== 'undefined') {
                    return settings['maximum'];
                } else if (typeof settings['format'] !== 'undefined'
                    && settings['format'] == 'float'
                ) {
                    return 0.14159 + id++;
                }
                return id++;
            case 'string':
                if (typeof settings['format'] !== 'undefined'
                    && settings['format'] == 'date'
                ) {
                    return '2016-01-01';
                } else if (typeof settings['description'] !== 'undefined'
                    && settings['description'] == 'time in format G:i'
                ) {
                    return '12:13';
                }
                return 'test string for ' + key;
            case 'boolean':
                return true;
            case 'array':
                return [getTestValueForType(key, docHandler.getArrayForKey('items', settings))];
            case 'object':
                return getTestValuesForObject(docHandler.getArrayForKey('properties', settings));
            default:
                return 'unknown type: ' + key;
        }
    }
};

module.exports = mockDataFromSwaggerYaml;
