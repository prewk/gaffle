// @flow

const spawn = require('child_process').spawn;

/**
 * Run a command using the given config with the given args
 */
function run(cmdConfig: CommandConfig, args: Array<string>) {
  const parts = cmdConfig.cmd.split(' ');
  const thread = spawn(parts[0], [...parts.slice(1), ...cmdConfig.opt, ...args], { env: Object.assign({}, cmdConfig.env, process.env) });

  // Let the spawned thread's behavior passthrough
  thread.stdout.pipe(process.stdout);
  thread.stderr.pipe(process.stderr);
  thread.on('error', console.error);
  thread.on('exit', process.exit);
}

module.exports = run;