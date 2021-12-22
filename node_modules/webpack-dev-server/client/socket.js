/* global __webpack_dev_server_client__ */
import WebSocketClient from "./clients/WebSocketClient.js";
import { log } from "./utils/log.js"; // this WebsocketClient is here as a default fallback, in case the client is not injected

/* eslint-disable camelcase */

var Client = // eslint-disable-next-line camelcase, no-nested-ternary
typeof __webpack_dev_server_client__ !== "undefined" ? // eslint-disable-next-line camelcase
typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : WebSocketClient;
/* eslint-enable camelcase */

var retries = 0;
var maxRetries = 10;
var client = null;

var socket = function initSocket(url, handlers, reconnect) {
  client = new Client(url);
  client.onOpen(function () {
    retries = 0;
    maxRetries = reconnect;
  });
  client.onClose(function () {
    if (retries === 0) {
      handlers.close();
    } // Try to reconnect.


    client = null; // After 10 retries stop trying, to prevent logspam.

    if (retries < maxRetries) {
      // Exponentially increase timeout to reconnect.
      // Respectfully copied from the package `got`.
      // eslint-disable-next-line no-mixed-operators, no-restricted-properties
      var retryInMs = 1000 * Math.pow(2, retries) + Math.random() * 100;
      retries += 1;
      log.info("Trying to reconnect...");
      setTimeout(function () {
        socket(url, handlers);
      }, retryInMs);
    }
  });
  client.onMessage(function (data) {
    var message = JSON.parse(data);

    if (handlers[message.type]) {
      handlers[message.type](message.data);
    }
  });
};

export default socket;