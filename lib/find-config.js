const fs = require('fs');
const findUp = require('find-up');
const finder = require('find-package-json');
const json5 = require('json5');

module.exports = function findConfig() {
    // Load .gafflerc
    const path = findUp('.gafflerc');
    if (path) {
        return json5.parse(fs.readFileSync(path, 'utf8'));
    }

    // Load package.json.gaffle
    const f = finder(path.resolve(__dirname, '..', '..'));
    const pkg = f.next().value;

    if (!pkg || !pkg.gaffle) {
        return null;
    }
};