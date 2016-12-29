const runner = require('../runner');

describe('Command runner', () => {
    it('should run the command', () => {
        let ranCmd;
        let ranOpt;

        const exec = (cmd, opt) => {
            ranCmd = cmd;
            ranOpt = opt;

            return {
                stdout: { pipe: () => {} },
                stderr: { pipe: () => {} },
            };
        };

        runner(
            exec,
            { env: {}, stdout: null, stderr: null },
            { cmd: 'foo', env: {} },
            {},
            ''
        );

        expect(ranCmd).toBe('foo');
        expect(ranOpt).toEqual({ env: {} });
    });

    it('should replace the params', () => {
        let ranCmd;

        const exec = (cmd, opt) => {
            ranCmd = cmd;

            return {
                stdout: { pipe: () => {} },
                stderr: { pipe: () => {} },
            };
        };

        runner(
            exec,
            { env: {}, stdout: null, stderr: null },
            { cmd: 'foo $TEST', env: {} },
            { '$TEST': 'REPLACED' },
            ''
        );

        expect(ranCmd).toBe('foo REPLACED');
    });

    it('should append a PATH entry', () => {
        let ranOpt;

        const exec = (cmd, opt) => {
            ranOpt = opt;

            return {
                stdout: { pipe: () => {} },
                stderr: { pipe: () => {} },
            };
        };

        runner(
            exec,
            { env: { PATH: '/bin' }, stdout: null, stderr: null },
            { cmd: 'foo', env: {} },
            {},
            'EXTRA'
        );

        expect(ranOpt).toEqual({ env: { PATH: '/bin:EXTRA' } });
    });
});