"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let buildUtils;
try {
    buildUtils = require('@vercel/build-utils');
}
catch (e) {
    // Fallback for older CLI versions
    buildUtils = require('@now/build-utils');
}
exports.default = buildUtils;
