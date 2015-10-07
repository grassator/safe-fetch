# safe-fetch

A `fetch()` wrapper that implements [Double Submit Cookies CSRF protection](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet#Double_Submit_Cookies).

## Requirements

* ES2015-compatible environment (or with a polyfill)
* `fetch()`-compatible environment (or with a polyfill)
* Server-set randomly generated cookie `csrf-token`, that is then compared with `x-csrf-token` header set on every request by `save-fetch`.

## Basic Usage

```js
import fetch from 'safe-fetch';

fetch('/some-url').then(console.log.bind(console));
```

## Advanced Options

`safe-fetch` supports all the options `fetch()` does, but by default sets `credentials: 'same-origin'` option to send the cookies required for the CSRF security. You can still override this and set it to `omit` or `include` in which case the `X-CSRF-Token` header will not be set.

## License

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
