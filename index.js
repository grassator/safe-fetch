/*!
 Copyright 2015 Dmitriy Kubyshkin

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

var Cookies = require('cookies-js');
var COOKIE_NAME = 'csrf-token';
var HEADER_NAME = 'x-csrf-token';

function safeFetch(url, options) {
    var token;
    options = Object.assign({}, options, safeFetch.defaultOptions);
    if (options.credentials === 'same-origin') {
        token = Cookies.get(COOKIE_NAME);
        options.headers = Object.assign({}, options.headers);
        options.headers[HEADER_NAME] = token;
    }
    // in case `fetch` starts to accept more arguments in the future
    // we copy all of them and just replace the options
    var fetchArgs = Array.from(arguments);
    fetchArgs[1] = options;
    return fetch.apply(undefined, fetchArgs);
}

safeFetch.defaultOptions = {
    credentials: 'same-origin'
};

module.exports = safeFetch;
