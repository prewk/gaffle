const colors = require('colors');
const parse = require('./parse');

/**
 * Show all commands
 */
function help(config) {
  console.log('Available commands:\n');

  // Iterate through all of the config's commands
  Object.keys(config).forEach(function (key) {
    let { cmd, opt, env, desc } = parse(config, key);

    // Remove `node ` from start of commands
    if (cmd.startsWith('node ')) {
      cmd = cmd.substring(5);
    }

    // Convert information we have about the commands to a readable console log
    const cmdStr = [cmd, ...opt].join(' ');
    let envStr = Object.keys(env).map(envKey => `${ envKey }=${ env[envKey] }`).join(' ');

    if (envStr) envStr += ' ';

    // Pad for higher readability
    const padCnt = 40 - key.length;

    // Log description or newline
    desc ? console.log(desc) : console.log('');

    // Log command
    console.log(`${ colors.green(key) }${ ' '.repeat(padCnt) }${ colors.bold(envStr) }${ colors.green(cmdStr) }`);
  });
}

module.exports = help;