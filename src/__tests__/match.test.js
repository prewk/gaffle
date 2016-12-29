const match = require('../match');

describe('Config matcher', () => {
    it('should find the correct command config on a direct match', () => {
        let results;

        results = match({
            'foo': { cmd: 'foo' },
            'bar': { cmd: 'bar' },
            'foo bar': { cmd: 'foo bar' },
        }, ['foo']);

        expect(results.cfg.cmd).toBe('foo');

        results = match({
            'foo': { cmd: 'foo' },
            'bar': { cmd: 'bar' },
            'foo bar': { cmd: 'foo bar' },
        }, ['foo', 'bar']);

        expect(results.cfg.cmd).toBe('foo bar');
    });

    it('should find the correct command config on a partial match', () => {
        const results = match({
            'foo': { cmd: 'foo' },
            'bar': { cmd: 'bar' },
            'foo bar': { cmd: 'foo bar' },
        }, ['foo', 'baz']);

        expect(results.cfg.cmd).toBe('foo');
        expect(results.params['$*']).toBe('baz');
        expect(results.params['$0']).toBe('baz');
    });

    it('should return a null config on no match', () => {
        const results = match({
            'foo': { cmd: 'foo' },
            'bar': { cmd: 'bar' },
            'foo bar': { cmd: 'foo bar' },
        }, ['foo baz']);

        expect(results.cfg.cmd).toBe('foo');
    });
});