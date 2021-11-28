"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapper;

var _path = _interopRequireDefault(require("path"));

var _mimeTypes = _interopRequireDefault(require("mime-types"));

var _rangeParser = _interopRequireDefault(require("range-parser"));

var _getFilenameFromUrl = _interopRequireDefault(require("./utils/getFilenameFromUrl"));

var _compatibleAPI = require("./utils/compatibleAPI");

var _ready = _interopRequireDefault(require("./utils/ready"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getValueContentRangeHeader(type, size, range) {
  return `${type} ${range ? `${range.start}-${range.end}` : "*"}/${size}`;
}

function createHtmlDocument(title, body) {
  return `${"<!DOCTYPE html>\n" + '<html lang="en">\n' + "<head>\n" + '<meta charset="utf-8">\n' + "<title>"}${title}</title>\n` + `</head>\n` + `<body>\n` + `<pre>${body}</pre>\n` + `</body>\n` + `</html>\n`;
}

const BYTES_RANGE_REGEXP = /^ *bytes/i;

function wrapper(context) {
  return async function middleware(req, res, next) {
    const acceptedMethods = context.options.methods || ["GET", "HEAD"]; // fixes #282. credit @cexoso. in certain edge situations res.locals is undefined.
    // eslint-disable-next-line no-param-reassign

    res.locals = res.locals || {};

    if (!acceptedMethods.includes(req.method)) {
      await goNext();
      return;
    }

    (0, _ready.default)(context, processRequest, req);

    async function goNext() {
      if (!context.options.serverSideRender) {
        return next();
      }

      return new Promise(resolve => {
        (0, _ready.default)(context, () => {
          // eslint-disable-next-line no-param-reassign
          res.locals.webpack = {
            devMiddleware: context
          };
          resolve(next());
        }, req);
      });
    }

    async function processRequest() {
      const filename = (0, _getFilenameFromUrl.default)(context, req.url);

      if (!filename) {
        await goNext();
        return;
      }

      let {
        headers
      } = context.options;

      if (typeof headers === "function") {
        headers = headers(req, res, context);
      }

      const allHeaders = [];

      if (!Array.isArray(headers)) {
        // eslint-disable-next-line guard-for-in
        for (const name in headers) {
          allHeaders.push({
            key: name,
            value: headers[name]
          });
        }

        headers = allHeaders;
      }

      headers.forEach(header => {
        (0, _compatibleAPI.setHeaderForResponse)(res, header.key, header.value);
      });

      if (!(0, _compatibleAPI.getHeaderFromResponse)(res, "Content-Type")) {
        // content-type name(like application/javascript; charset=utf-8) or false
        const contentType = _mimeTypes.default.contentType(_path.default.extname(filename)); // Only set content-type header if media type is known
        // https://tools.ietf.org/html/rfc7231#section-3.1.1.5


        if (contentType) {
          (0, _compatibleAPI.setHeaderForResponse)(res, "Content-Type", contentType);
        }
      }

      if (!(0, _compatibleAPI.getHeaderFromResponse)(res, "Accept-Ranges")) {
        (0, _compatibleAPI.setHeaderForResponse)(res, "Accept-Ranges", "bytes");
      }

      const rangeHeader = (0, _compatibleAPI.getHeaderFromRequest)(req, "range");
      let start;
      let end;

      if (rangeHeader && BYTES_RANGE_REGEXP.test(rangeHeader)) {
        const size = await new Promise(resolve => {
          context.outputFileSystem.lstat(filename, (error, stats) => {
            if (error) {
              context.logger.error(error);
              return;
            }

            resolve(stats.size);
          });
        });
        const parsedRanges = (0, _rangeParser.default)(size, rangeHeader, {
          combine: true
        });

        if (parsedRanges === -1) {
          const message = "Unsatisfiable range for 'Range' header.";
          context.logger.error(message);
          const existingHeaders = (0, _compatibleAPI.getHeaderNames)(res);

          for (let i = 0; i < existingHeaders.length; i++) {
            res.removeHeader(existingHeaders[i]);
          }

          (0, _compatibleAPI.setStatusCode)(res, 416);
          (0, _compatibleAPI.setHeaderForResponse)(res, "Content-Range", getValueContentRangeHeader("bytes", size));
          (0, _compatibleAPI.setHeaderForResponse)(res, "Content-Type", "text/html; charset=utf-8");
          const document = createHtmlDocument(416, `Error: ${message}`);
          const byteLength = Buffer.byteLength(document);
          (0, _compatibleAPI.setHeaderForResponse)(res, "Content-Length", Buffer.byteLength(document));
          (0, _compatibleAPI.send)(req, res, document, byteLength);
          return;
        } else if (parsedRanges === -2) {
          context.logger.error("A malformed 'Range' header was provided. A regular response will be sent for this request.");
        } else if (parsedRanges.length > 1) {
          context.logger.error("A 'Range' header with multiple ranges was provided. Multiple ranges are not supported, so a regular response will be sent for this request.");
        }

        if (parsedRanges !== -2 && parsedRanges.length === 1) {
          // Content-Range
          (0, _compatibleAPI.setStatusCode)(res, 206);
          (0, _compatibleAPI.setHeaderForResponse)(res, "Content-Range", getValueContentRangeHeader("bytes", size, parsedRanges[0]));
          [{
            start,
            end
          }] = parsedRanges;
        }
      }

      const isFsSupportsStream = typeof context.outputFileSystem.createReadStream === "function";
      let bufferOtStream;
      let byteLength;

      try {
        if (typeof start !== "undefined" && typeof end !== "undefined" && isFsSupportsStream) {
          bufferOtStream = context.outputFileSystem.createReadStream(filename, {
            start,
            end
          });
          byteLength = end - start + 1;
        } else {
          bufferOtStream = context.outputFileSystem.readFileSync(filename);
          ({
            byteLength
          } = bufferOtStream);
        }
      } catch (_ignoreError) {
        await goNext();
        return;
      }

      (0, _compatibleAPI.send)(req, res, bufferOtStream, byteLength);
    }
  };
}