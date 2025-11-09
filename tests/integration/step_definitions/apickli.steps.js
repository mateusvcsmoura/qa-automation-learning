'use strict';

const { Given, When, Then, Before, setDefaultTimeout } = require('@cucumber/cucumber');
const apickli = require('apickli');
const assert = require('assert');

setDefaultTimeout(60 * 1000);

Before(function () {
    this.apickli = new apickli.Apickli('https', 'jsonplaceholder.typicode.com');
});

Given(/^I set (.*) header to (.*)$/, function (headerName, headerValue) {
    this.apickli.addRequestHeader(headerName, headerValue);
});

Given(/^I set headers to$/, function (headers, callback) {
    this.apickli.setHeaders(headers.hashes());
    callback();
});

When(/^I GET to (.*)$/, function (resource, callback) {
    this.apickli.get(resource, callback);
});

Then(/^response status code should be (\d+)$/, function (statusCode, callback) {
    this.apickli.assertResponseCode(String(statusCode));
    callback();
});

Then(/^response body path (.*) should be "(.*)"$/, function (path, expectedValue, callback) {
    this.apickli.assertPathInResponseBodyMatchesExpression(path, expectedValue);
    callback();
});


Then(/^response header content-type should be (.*)$/, function (expectedValue, callback) {
    try {
        const headers = this.apickli.httpResponse && this.apickli.httpResponse.headers;
        const contentType = headers && (headers['content-type'] || headers['Content-Type']);
        assert.ok(contentType, 'No header Content-Type found in response');
        assert.ok(contentType.indexOf(expectedValue) !== -1, `Expected Content-Type containing "${expectedValue}", received: "${contentType}"`);
        callback();
    } catch (err) {
        callback(err);
    }
});

Then(/^response body should be valid json$/, function (callback) {
    try {
        const body = this.apickli.httpResponse && this.apickli.httpResponse.body;
        JSON.parse(body);
        callback();
    } catch (err) {
        callback(new Error('Response is not a valid JSON: ' + (err.message || err)));
    }
});
