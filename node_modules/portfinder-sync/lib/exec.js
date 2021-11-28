'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// 3rd party
const parseArgs = require('minimist')
const portfinder = require('portfinder')

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

const basePort = parseArgs(process.argv.slice(2))['base-port']

if (basePort) {
  portfinder.basePort = parseInt(basePort)
}

portfinder.getPort((__, port) => {
  process.stdout.write(`${port}`)
})
