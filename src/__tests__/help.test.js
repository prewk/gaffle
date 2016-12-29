const help = require('../help');

describe('Help formatter', () => {
    it('should create some lines of text from the config', () => {
        const results = help({
            'foo': {
                'cmd': 'foobar',
                'env': {},
                'desc': 'Foo description',
            }
        });

        expect(results).toHaveLength(2);
    });
});