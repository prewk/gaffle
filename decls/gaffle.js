declare type EnvConfig = { [key: string]: string | number };

declare type EnvUnion = string | EnvConfig;

declare type OptConfig = Array<string>

declare type OptUnion = string | OptConfig;

declare type RawCommandConfig = {
  cmd: string;
  desc: ?string;
  opt: ?OptUnion;
  env: ?EnvUnion;
};

declare type CommandConfig = {|
  cmd: string;
  desc: string;
  opt: OptConfig;
  env: EnvConfig;
|};

declare type Config = { [key: string]: string | RawCommandConfig };
