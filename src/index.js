#!/usr/bin/env node

const finder = require('find-package-json');
const parse = require('./parse');
const help = require('./help');
const run = require('./run');

// @flow

/**
 * Attempt to handle the arguments
 */
function init(config: Config, args: Array<string>) {
  const argStr = args.join(' ');

  // Sort longest command to shortest
  const cmd = Object.keys(config)
    .sort((a, b) => b.length - a.length)
    .find((key) => argStr.startsWith(key));

  if (!cmd) {
    // No command matched - show help
    return help(config);
  }

  // Run  matched command
  run(parse(config, cmd), args);
}

// Find the package.json
const f = finder();
const pkg = f.next();

if (pkg.value && typeof pkg.value.gaffle === 'object') {
  // Extract optional command arguments
  const [,, ...args] = process.argv;

  // Run
  init(pkg.value.gaffle, args);
} else {
  throw new Error('Unable to find gaffle config');
}