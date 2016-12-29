

/**
 * Find the CmdConfig for the given array of arguments
 */
module.exports = function match(config, args) {
    const argStr = args.join(' ');
    let params = {};

    // Sort longest command to shortest
    const cmd = Object.keys(config).sort((a, b) => b.length - a.length).find(key => argStr.startsWith(key));

    if (cmd && argStr.length > cmd.length) {
        params = args.slice(cmd.split(' ').length).reduce((params, arg, i) => {
            params['$' + i] = arg;

            return params;
        }, {});

        params['$*'] = argStr.substring(cmd.length + 1);
    }

    return cmd ? { cfg: config[cmd], params } : { cfg: null, params: {} };
};