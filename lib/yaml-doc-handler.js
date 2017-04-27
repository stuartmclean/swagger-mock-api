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
};

module.exports = yamlDocHandler;
