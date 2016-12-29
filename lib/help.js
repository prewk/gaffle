const colors = require('colors/safe');;

/**
 * Left pad
 */
function pad(to, str) {
    if (to <= str.length) {
        return str;
    }

    for (let i = 0; i < to - str.length; i++) {
        str += ' ';
    }

    return str;
}

/**
 * Create help
 */
module.exports = function help(config) {
    const keys = Object.keys(config);

    // Get longest command
    const longest = keys.reduce((longest, cmd) => {
        return cmd.length > longest.length ? cmd : longest;
    });

    return ['Available commands:'].concat(keys.map(cmd => {
        return colors.red(pad(longest.length + 5, cmd)) + colors.white(config[cmd].desc);
    }));
};