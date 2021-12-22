/* eslint-env mocha */
'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
const assert = require('chai').assert

// lib
const portfinderSync = require('../lib/index.js')

/* -----------------------------------------------------------------------------
 * test
 * -------------------------------------------------------------------------- */

describe('portfinderSync', function () {
  it('Should return port', function () {
    assert.isNumber(portfinderSync.getPort())
    assert.equal(portfinderSync.getPort(9229), 9229)
  })
})
