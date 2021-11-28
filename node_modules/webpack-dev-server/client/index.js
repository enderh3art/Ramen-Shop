/* global __resourceQuery, __webpack_hash__ */
import webpackHotLog from "webpack/hot/log.js";
import stripAnsi from "./modules/strip-ansi/index.js";
import parseURL from "./utils/parseURL.js";
import socket from "./socket.js";
import { formatProblem, show, hide } from "./overlay.js";
import { log, setLogLevel } from "./utils/log.js";
import sendMessage from "./utils/sendMessage.js";
import reloadApp from "./utils/reloadApp.js";
import createSocketURL from "./utils/createSocketURL.js";
var status = {
  isUnloading: false,
  // TODO Workaround for webpack v4, `__webpack_hash__` is not replaced without HotModuleReplacement
  // eslint-disable-next-line camelcase
  currentHash: typeof __webpack_hash__ !== "undefined" ? __webpack_hash__ : ""
};
var options = {
  hot: false,
  liveReload: false,
  progress: false,
  overlay: false
};
var parsedResourceQuery = parseURL(__resourceQuery);

if (parsedResourceQuery.hot === "true") {
  options.hot = true;
  log.info("Hot Module Replacement enabled.");
}

if (parsedResourceQuery["live-reload"] === "true") {
  options.liveReload = true;
  log.info("Live Reloading enabled.");
}

if (parsedResourceQuery.logging) {
  options.logging = parsedResourceQuery.logging;
}

if (typeof parsedResourceQuery.reconnect !== "undefined") {
  options.reconnect = Number(parsedResourceQuery.reconnect);
}

function setAllLogLevel(level) {
  // This is needed because the HMR logger operate separately from dev server logger
  webpackHotLog.setLogLevel(level === "verbose" || level === "log" ? "info" : level);
  setLogLevel(level);
}

if (options.logging) {
  setAllLogLevel(options.logging);
}

self.addEventListener("beforeunload", function () {
  status.isUnloading = true;
});
var onSocketMessage = {
  hot: function hot() {
    if (parsedResourceQuery.hot === "false") {
      return;
    }

    options.hot = true;
    log.info("Hot Module Replacement enabled.");
  },
  liveReload: function liveReload() {
    if (parsedResourceQuery["live-reload"] === "false") {
      return;
    }

    options.liveReload = true;
    log.info("Live Reloading enabled.");
  },
  invalid: function invalid() {
    log.info("App updated. Recompiling..."); // Fixes #1042. overlay doesn't clear if errors are fixed but warnings remain.

    if (options.overlay) {
      hide();
    }

    sendMessage("Invalid");
  },
  hash: function hash(_hash) {
    status.previousHash = status.currentHash;
    status.currentHash = _hash;
  },
  logging: setAllLogLevel,
  overlay: function overlay(value) {
    if (typeof document === "undefined") {
      return;
    }

    options.overlay = value;
  },
  reconnect: function reconnect(value) {
    if (parsedResourceQuery.reconnect === "false") {
      return;
    }

    options.reconnect = value;
  },
  progress: function progress(_progress) {
    options.progress = _progress;
  },
  "progress-update": function progressUpdate(data) {
    if (options.progress) {
      log.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
    }

    sendMessage("Progress", data);
  },
  "still-ok": function stillOk() {
    log.info("Nothing changed.");

    if (options.overlay) {
      hide();
    }

    sendMessage("StillOk");
  },
  ok: function ok() {
    sendMessage("Ok");

    if (options.overlay) {
      hide();
    }

    reloadApp(options, status);
  },
  // TODO: remove in v5 in favor of 'static-changed'
  "content-changed": function contentChanged(file) {
    log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  "static-changed": function staticChanged(file) {
    log.info("".concat(file ? "\"".concat(file, "\"") : "Content", " from static directory was changed. Reloading..."));
    self.location.reload();
  },
  warnings: function warnings(_warnings) {
    log.warn("Warnings while compiling.");

    var printableWarnings = _warnings.map(function (error) {
      var _formatProblem = formatProblem("warning", error),
          header = _formatProblem.header,
          body = _formatProblem.body;

      return "".concat(header, "\n").concat(stripAnsi(body));
    });

    sendMessage("Warnings", printableWarnings);

    for (var i = 0; i < printableWarnings.length; i++) {
      log.warn(printableWarnings[i]);
    }

    var needShowOverlayForWarnings = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;

    if (needShowOverlayForWarnings) {
      show("warning", _warnings);
    }

    reloadApp(options, status);
  },
  errors: function errors(_errors) {
    log.error("Errors while compiling. Reload prevented.");

    var printableErrors = _errors.map(function (error) {
      var _formatProblem2 = formatProblem("error", error),
          header = _formatProblem2.header,
          body = _formatProblem2.body;

      return "".concat(header, "\n").concat(stripAnsi(body));
    });

    sendMessage("Errors", printableErrors);

    for (var i = 0; i < printableErrors.length; i++) {
      log.error(printableErrors[i]);
    }

    var needShowOverlayForErrors = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;

    if (needShowOverlayForErrors) {
      show("error", _errors);
    }
  },
  error: function error(_error) {
    log.error(_error);
  },
  close: function close() {
    log.info("Disconnected!");

    if (options.overlay) {
      hide();
    }

    sendMessage("Close");
  }
};
var socketURL = createSocketURL(parsedResourceQuery);
socket(socketURL, onSocketMessage, options.reconnect);