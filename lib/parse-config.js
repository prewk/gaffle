

/**
 * Parse raw config into a strict config
 */
module.exports = function parseConfig(raw) {
    return Object.keys(raw).reduce((config, key) => {
        let cmd;
        let env;
        let desc;

        // Extract command
        if (typeof raw[key] === 'string') {
            cmd = raw[key];
        } else if (raw[key] && raw[key].cmd) {
            cmd = raw[key].cmd;
        } else {
            throw new Error(`Missing cmd for '${ key }'`);
        }

        // Extract description
        desc = typeof raw[key] === 'object' && raw[key].desc ? raw[key].desc : '';

        // Extract env vars
        env = typeof raw[key] === 'object' && raw[key].env ? raw[key].env : {};

        config[key] = {
            cmd,
            env,
            desc
        };

        return config;
    }, {});
};