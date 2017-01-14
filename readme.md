
# Gaffle

## Installation

`npm install --save-dev gaffle`

## Example

Add this to your `package.json`:

```json
{
  "scripts": {
    "test": "gaffle"
  },
  "gaffle": {
    "jest": { "cmd": "jest $0", "env": { "NODE_ENV": "test" } },
    "jest": { "cmd": "jest --watch", "env": { "NODE_ENV": "test" } },
    "flow": "flow check $0"
  }
}
```

Usage: `npm test jest` / `npm test jest watch` / `npm test flow`.

## Why?

For organizing advanced scripts in `package.json` into simpler commands, and being able to run them via special commands such as `npm test` that suppresses some annoying output.

## .gafflerc

You can put your gaffle config in a `.gafflerc` file instead of `package.json`.

```json
{
  "scripts": {
    "test": "gaffle"
  }
}
```

```js
// .gafflerc is a JSON5 file (supports comments and stuff)
{
    "jest": {
      "cmd": "jest $0", "env": { "NODE_ENV": "test" }
    },
    "jest": {
      "cmd": "jest --watch", "env": { "NODE_ENV": "test" }
    },
    "flow": "flow check $0",
}
```

## Config schema

```json
{
  "<short-hand command 1>": "<actual command>",
  "<short-hand command 2>": {
    "cmd": "<actual command>",
    "env": {
      "SOME_ENV_VAR": "<env var value>"
    },
    "desc": "<Description of the command>"
  },
  "<short-hand command 3>": "<actual command> $0 $1",
  "<short-hand command 4>": "<actual command> $*"
}
```

Running an invalid short-hand command (or no command) yields a **help** output that lists the commands