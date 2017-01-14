#!/usr/bin/env node


const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const match = require('./match');
const parse = require('./parse-config');
const runner = require('./runner');
const help = require('./help');
const findConfig = require('./find-config');

const foundConfig = findConfig();

if (!foundConfig) {
    throw new Error('Couldn\'t find config');
}

const baseCfg = parse(foundConfig);

// Extract arguments
const [,, ...args] = process.argv;

// Match arguments
const { cfg, params } = match(baseCfg, args);

if (!cfg) {
    // Show help
    help(baseCfg).forEach(line => console.log(line));
} else {
    // Run command
    let appendPath = '';

    if (fs.existsSync(path.resolve(__dirname, '..', '..', '.bin'))) {
        appendPath += path.resolve(__dirname, '..', '..', '.bin');
    }

    runner(exec, process, cfg, params, appendPath);
}