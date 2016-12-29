const pad = require('../pad');

describe('Pad util', () => {
    it('should pad the string correctly', () => {
        expect(pad(10, 'foo')).toBe('foo       ');
    });
});