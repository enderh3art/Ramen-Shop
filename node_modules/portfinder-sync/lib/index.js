'use strict'

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

// core
const spawnSync = require('child_process').spawnSync

/* -----------------------------------------------------------------------------
 * dependencies
 * -------------------------------------------------------------------------- */

module.exports = {
  getPort (basePort) {
    const args = [require.resolve('./exec')]

    if (basePort) {
      args.push('--base-port')
      args.push(basePort)
    }

    const result = spawnSync(process.execPath, args)
    return parseInt(result.stdout.toString())
  }
}
