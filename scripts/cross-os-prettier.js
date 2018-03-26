#! /usr/bin/env node
var path = require('path')
var execSync = require('child_process').execSync
var SEPARATOR = process.platform === 'win32' ? ';' : ':'
var env = Object.assign({}, process.env)

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH

function myExecSync(cmd) {
  var output = execSync(cmd, {
    cwd: process.cwd(),
    env: env
  });

  console.log('\x1b[34m', output.toString('utf8'))
}

if (process.platform === 'win32') {
  console.log('\x1b[32m', 'running prettier on windows platform')
  return myExecSync(
    'prettier --config .prettierrc --write {!(node_modules),!(dist)/**/*,!(scripts)/**/*}/**/*.{js,jsx,scss}'
  )
} else {
  console.log('\x1b[32m', 'running prettier on non-windows platform')
  var prettierScript = `prettier --config .prettierrc --write '{!(node_modules),!(dist)/**/*,!(scripts)/**/*}/**/*.{js,jsx,scss}'`
  return myExecSync(prettierScript)
}
