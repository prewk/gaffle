// @flow

declare type Gaffle$RawConfig = {
    [key: string]: string | { env: ?{ [key: string]: string }, cmd: ?string, desc: ?string };
};

declare type Gaffle$CmdConfig = {
    cmd: string;
    env: { [key: string]: string };
    desc: string;
};

declare type Gaffle$Config = {
    [key: string]: Gaffle$CmdConfig;
};

declare type Gaffle$ExecOpts = {
    env: { [key: string]: string },
};

declare type Gaffle$ExecObj = {
    stdout: { pipe: Function },
    stderr: { pipe: Function },
};

declare type Gaffle$Exec = (string, opt: Gaffle$ExecOpts) => Gaffle$ExecObj;

declare type Gaffle$ProcessObj = {
    env: { [key: string]: string },
    stdout: Object,
    stderr: Object,
};