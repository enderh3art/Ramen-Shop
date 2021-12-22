<h1 align="center">portfinder-sync</h1>
<div align="center">
  <p>Find an open port synchronously.</p>
  <div>
  <a href="https://travis-ci.org/jaridmargolin/portfinder-sync"><img src="https://travis-ci.org/jaridmargolin/portfinder-sync.svg?branch=master" alt="Build Status"></a>
  <a href="https://coveralls.io/github/jaridmargolin/portfinder-sync?branch=master"><img src="https://coveralls.io/repos/github/jaridmargolin/portfinder-sync/badge.svg?branch=master" alt="Coverage Status"></a>
  <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="Standard - JavaScript Style Guide"></a>
  </div>
  <div>
  <a href="https://npmjs.org/package/portfinder-sync"><img src="https://img.shields.io/npm/v/portfinder-sync.svg" alt="NPM portfinder-sync package"></a>
  <a href="https://david-dm.org/jaridmargolin/portfinder-sync"><img src="https://david-dm.org/jaridmargolin/portfinder-sync.svg" alt="Dependency Status"></a>
  <a href="https://david-dm.org/jaridmargolin/portfinder-sync#info=devDependencies"><img src="https://david-dm.org/jaridmargolin/portfinder-sync/dev-status.svg" alt="devDependency Status"></a>
  </div>
</div>
<br>

### Example Usage

```
const basePort = 9229 // port to begin scanning at
const openport = portFinderSync.getPort(basePort)
```

## License

The MIT License (MIT) Copyright (c) 2016 Jarid Margolin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
