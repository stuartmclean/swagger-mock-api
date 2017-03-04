'use strict';

var yaml = require('js-yaml');

/**
 * @param {string} swaggerYamlContent
 */
var yamlDocHandler = function (swaggerYamlContent) {

    /** @param {*} doc - Json version of yaml */
    var doc = yaml.safeLoad(swaggerYamlContent);

    /**
     * @returns {*}
     */
    this.getDoc = function () {
        return doc;
    };

    /**
     * returns data using $ref tags where required / available,
     *
     * @param {string} needle
     * @param {*} object
     * @returns {*}
     */
    this.getArrayForKey = function (needle, object) {
        if (Object.keys(object[needle])[0] == '$ref') {
            var refsplit = object[needle]['$ref'].split('/');

            if (refsplit.length !== 3) {
                console.log(object[needle]['$ref'] + ' is not a valid reference');
                return {};
            }

            if (typeof doc[refsplit[1]][refsplit[2]] === 'undefined') {
                console.log(object[needle]['$ref'] + ' is not a valid reference');
                return {};
            }

            return doc[refsplit[1]][refsplit[2]];
        }
        return object[needle];
    };

    /**
     * same as getArrayForKey, but takes an array of keys, called recursively
     *
     * @param {array[string]} keys
     * @param {*} object
     * @returns {*}
     */
    this.getArrayForMultipleKeys = function (keys, object) {
        for (var i = 0, len = keys.length; i < len; i++) {
            object = this.getArrayForKey(keys[i], object)
            if (object === {}) {
                return object;
            }
        }
        return object;
    }
};

module.exports = yamlDocHandler;
