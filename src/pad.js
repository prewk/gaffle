/**
 * Right pad
 */
module.exports = function pad(to: number, str: string): string {
    if (to <= str.length) {
        return str;
    }

    const pads = to - str.length;

    for (let i = 0; i < pads; i++) {
        str += ' ';
    }

    return str;
}
