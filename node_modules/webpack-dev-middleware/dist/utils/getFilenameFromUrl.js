"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFilenameFromUrl;

var _path = _interopRequireDefault(require("path"));

var _url = require("url");

var _querystring = _interopRequireDefault(require("querystring"));

var _getPaths = _interopRequireDefault(require("./getPaths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cacheStore = new WeakMap();

const mem = (fn, {
  cache = new Map()
} = {}) => {
  const memoized = (...arguments_) => {
    const [key] = arguments_;
    const cacheItem = cache.get(key);

    if (cacheItem) {
      return cacheItem.data;
    }

    const result = fn.apply(void 0, arguments_);
    cache.set(key, {
      data: result
    });
    return result;
  };

  cacheStore.set(memoized, cache);
  return memoized;
};

const memoizedParse = mem(_url.parse);

function getFilenameFromUrl(context, url) {
  const {
    options
  } = context;
  const paths = (0, _getPaths.default)(context);
  let foundFilename;
  let urlObject;

  try {
    // The `url` property of the `request` is contains only  `pathname`, `search` and `hash`
    urlObject = memoizedParse(url, false, true);
  } catch (_ignoreError) {
    return;
  }

  for (const {
    publicPath,
    outputPath
  } of paths) {
    let filename;
    let publicPathObject;

    try {
      publicPathObject = memoizedParse(publicPath !== "auto" && publicPath ? publicPath : "/", false, true);
    } catch (_ignoreError) {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (urlObject.pathname && urlObject.pathname.startsWith(publicPathObject.pathname)) {
      filename = outputPath; // Strip the `pathname` property from the `publicPath` option from the start of requested url
      // `/complex/foo.js` => `foo.js`

      const pathname = urlObject.pathname.substr(publicPathObject.pathname.length);

      if (pathname) {
        filename = _path.default.join(outputPath, _querystring.default.unescape(pathname));
      }

      let fsStats;

      try {
        fsStats = context.outputFileSystem.statSync(filename);
      } catch (_ignoreError) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (fsStats.isFile()) {
        foundFilename = filename;
        break;
      } else if (fsStats.isDirectory() && (typeof options.index === "undefined" || options.index)) {
        const indexValue = typeof options.index === "undefined" || typeof options.index === "boolean" ? "index.html" : options.index;
        filename = _path.default.join(filename, indexValue);

        try {
          fsStats = context.outputFileSystem.statSync(filename);
        } catch (__ignoreError) {
          // eslint-disable-next-line no-continue
          continue;
        }

        if (fsStats.isFile()) {
          foundFilename = filename;
          break;
        }
      }
    }
  } // eslint-disable-next-line consistent-return


  return foundFilename;
}