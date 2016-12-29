// @flow

/**
 * Start the process
 */
module.exports = function runner(
    exec: Gaffle$Exec,
    process: Gaffle$ProcessObj,
    config: Gaffle$CmdConfig,
    params: { [key: string]: string } = {},
    appendPath: string = ''
): void {
    let cmd = config.cmd;

    // Replace vars
    Object.keys(params).forEach((key) => {
        cmd = cmd.replace(key, params[key]);
    });

    // Append .bin to $PATH
    const processEnv = Object.assign({}, process.env);

    if (appendPath && processEnv.PATH) {
        processEnv.PATH += `:${appendPath}`;
    }

    // Run
    const executive = exec(cmd, Object.assign({}, { env: Object.assign({}, config.env, processEnv) }));
    
    // Pipe to stdout and stderr
    executive.stdout.pipe(process.stdout);
    executive.stderr.pipe(process.stderr);
}