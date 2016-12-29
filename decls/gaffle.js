// @flow

export type Gaffle$RawConfig = {
    [key: string]: string | { env: ?{ [key: string]: string }, cmd: ?string, desc: ?string };
};

export type Gaffle$CmdConfig = {
    cmd: string;
    env: { [key: string]: string };
    desc: string;
};

export type Gaffle$Config = {
    [key: string]: Gaffle$CmdConfig;
};

type Gaffle$ExecOpts = {
    env: { [key: string]: string },
};

type Gaffle$ExecObj = {
    stdout: { pipe: Function },
    stderr: { pipe: Function },
};

type Gaffle$Exec = (string, opt: Gaffle$ExecOpts) => Gaffle$ExecObj;

type Gaffle$ProcessObj = {
    env: { [key: string]: string },
    stdout: Object,
    stderr: Object,
};