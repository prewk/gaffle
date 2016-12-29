const parseConfig = require('../parse-config');

describe('Config parser', () => {
    it('should convert a string command to a command config', () => {
        expect(parseConfig({
            'foo': 'bar'
        })).toEqual({
            'foo': {
                cmd: 'bar',
                env: {},
                desc: '',
            }
        });
    });

    it('should default command config fields', () => {
        expect(parseConfig({
            'foo': { cmd: 'bar' }
        })).toEqual({
            'foo': {
                cmd: 'bar',
                env: {},
                desc: '',
            }
        });
    });
});