

/**
 * Parse a command in the config
 */
function parse(config, key) {
  let cmd = '';
  let desc = '';
  let opt = [];
  let env = {};

  if (typeof config[key] === 'string') {
    // Command is just a string
    cmd = config[key];
  } else if (typeof config[key] === 'object') {
    // Command is a config object

    if (!config[key].cmd) {
      throw new Error(`Missing 'cmd' property for '${ key }'`);
    }

    cmd = config[key].cmd;

    if (typeof config[key].opt === 'string') {
      // opt is a string, convert to array
      opt = config[key].opt.split(' ');
    } else if (Array.isArray(config[key].opt)) {
      // opt is an array of strings
      opt = config[key].opt;
    } else if (config[key].opt) {
      throw new Error(`Invalid 'opt' property for '${ key }', must be string | Array<string>`);
    }

    if (typeof config[key].env === 'string') {
      // env is a string, convert to object
      env = config[key].env.split(' ').reduce((env, item) => {
        const [envKey, envValue] = item.split('=');

        env[envKey] = envValue;

        return env;
      }, {});
    } else if (typeof config[key].env === 'object') {
      // env is an object
      env = Object.assign(env, config[key].env);
    } else if (config[key].env) {
      throw new Error(`Invalid 'env' property for '${ key }', must be string | { [key: string]: string | number }`);
    }

    if (typeof config[key].desc === 'string') {
      // desc is a string, use it
      desc = config[key].desc;
    }
  }

  return {
    cmd,
    opt,
    env,
    desc
  };
}

module.exports = parse;