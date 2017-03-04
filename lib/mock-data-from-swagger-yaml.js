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
     * @param {string} requestType
     * @returns {*}
     */
    this.getMockData = function (pathName, requestType) {
        var doc = docHandler.getDoc();

        if (typeof doc['paths']['/' + pathName] === 'undefined') {
            return [];
        }

        var rootObject = doc['paths']['/' + pathName][requestType]['responses']['200']['schema']['properties']['data'],
            items = docHandler.getArrayForKey('items', rootObject);

        return [
            getTestValuesForObject(items['properties'])
        ];

        // var rootObject = doc['paths']['/' + pathName][requestType]['responses']['200']['schema']['properties'],
        //     data = docHandler.getArrayForKey('data', rootObject);
        //
        // if (docHandler.getArrayForKey('items', data) !== {}) {
        //     return [
        //         getTestValuesForObject(data['items']['properties'])
        //     ];
        // } else {
        //     return [
        //         getArrayForMultipleKeys(['data', 'items', 'properties'], rootObject)
        //     ];
        // }
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
                return getStringFormats(key, settings);
            case 'boolean':
                return true;
            case 'array':
                return [getTestValueForType(key, docHandler.getArrayForKey('items', settings))];
            case 'object':
                return getTestValuesForObject(docHandler.getArrayForKey('properties', settings));
            default:
                return 'unknown type: ' + key;
        }
    };

    var getStringFormats = function (key, settings) {
        var format = (typeof settings['format'] !== 'undefined')
            ? settings['format']
            : (typeof settings['description'] !== 'undefined')
                ? settings['description']
                : '';

        switch (format) {
            case 'date':
                return '2016-01-01';
            case 'date-time':
                return '2016-01-01T15:16:17.005Z';
            case 'time in format G:i':
                return '12:13';
            default:
                return 'test string for ' + key;
        }
    };
};

module.exports = mockDataFromSwaggerYaml;
