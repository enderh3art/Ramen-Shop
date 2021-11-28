"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shouldStoreRHSInTemporaryVariable;

var _core = require("@babel/core");

function shouldStoreRHSInTemporaryVariable(node) {
  if (_core.types.isArrayPattern(node)) {
    const nonNullElements = node.elements.filter(element => element !== null);
    if (nonNullElements.length > 1) return true;else return shouldStoreRHSInTemporaryVariable(nonNullElements[0]);
  } else if (_core.types.isObjectPattern(node)) {
    if (node.properties.length > 1) return true;else if (node.properties.length === 0) return false;else return shouldStoreRHSInTemporaryVariable(node.properties[0]);
  } else if (_core.types.isObjectProperty(node)) {
    return shouldStoreRHSInTemporaryVariable(node.value);
  } else if (_core.types.isAssignmentPattern(node)) {
    return shouldStoreRHSInTemporaryVariable(node.left);
  } else if (_core.types.isRestElement(node)) {
    if (_core.types.isIdentifier(node.argument)) return true;
    return shouldStoreRHSInTemporaryVariable(node.argument);
  } else {
    return false;
  }
}