const parse = require('../parse');

describe('Parse', () => {
  it('should parse a simple string command', () => {
    expect(parse({ foo: 'bar' }, 'foo')).toEqual({
      cmd: 'bar',
      opt: [],
      env: {},
      desc: ''
    });
  });

  it('should parse an opt string into an array', () => {
    expect(parse({ foo: { cmd: 'bar', opt: '--lorem --ipsum' } }, 'foo')).toEqual({
      cmd: 'bar',
      opt: ['--lorem', '--ipsum'],
      env: {},
      desc: ''
    });
  });

  it('should parse an env string into an object', () => {
    expect(parse({ foo: { cmd: 'bar', env: 'LOREM=1 IPSUM=2' } }, 'foo')).toEqual({
      cmd: 'bar',
      opt: [],
      env: { LOREM: '1', IPSUM: '2' },
      desc: ''
    });
  });

  it('should combine all props into one command config', () => {
    expect(parse({ foo: { cmd: 'bar', opt: '--lorem', env: 'LOREM=1 IPSUM=2', desc: 'title' } }, 'foo')).toEqual({
      cmd: 'bar',
      opt: ['--lorem'],
      env: { LOREM: '1', IPSUM: '2' },
      desc: 'title'
    });
  });
});