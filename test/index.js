const Cookies = require('cookies-js');
const assert = require('assert');
const sinon = require('sinon');
const safeFetch = require('../');

const TEST_URL = '/foobar/';
const TEST_TOKEN = '324543524312dct34ct34c3t23';

describe('safe fetch', () => {

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        sandbox.restore();
    });

    it('should add credentials and xsrf header by default', () => {
        global.fetch = sinon.spy();
        Cookies.get = () => TEST_TOKEN;
        safeFetch(TEST_URL);
        assert.deepStrictEqual(global.fetch.firstCall.args, [
            TEST_URL,
            {
                credentials: 'same-origin',
                headers: {
                    'x-csrf-token': TEST_TOKEN
                }
            }
        ]);
    });

    it('should pass on additional arguments to the fetch if present for future compat', () => {
        global.fetch = sinon.spy();
        Cookies.get = () => TEST_TOKEN;
        safeFetch(TEST_URL, {}, 1, 2, 3, 4);
        assert.deepStrictEqual(global.fetch.firstCall.args.slice(2), [1, 2, 3, 4]);
    });

    it('should not add header if the credentials are not set to same-origin', () => {
        global.fetch = sinon.spy();
        safeFetch(TEST_URL, {
            credentials: 'include'
        });
        assert.deepStrictEqual(global.fetch.firstCall.args, [
            TEST_URL,
            {
                credentials: 'include'
            }
        ]);
    });

    it('should be possible to configure name of the cookie', () => {
        global.fetch = sinon.spy();
        Cookies.get = sinon.spy(() => TEST_TOKEN);
        sandbox.stub(safeFetch, 'cookieName', 'MY_COOKIE_NAME');
        safeFetch(TEST_URL);
        assert.deepStrictEqual(Cookies.get.firstCall.args[0], 'MY_COOKIE_NAME');
    });

    it('should be possible to configure header name', () => {
        global.fetch = sinon.spy();
        Cookies.get = () => TEST_TOKEN;
        sandbox.stub(safeFetch, 'headerName', 'x-my-header-name');
        safeFetch(TEST_URL);
        assert.deepStrictEqual(global.fetch.firstCall.args[1].headers, { 'x-my-header-name': TEST_TOKEN });
    });

});
