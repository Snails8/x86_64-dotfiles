"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oldExtractor = void 0;
function oldExtractor(text) {
    const regEx = /^\ {0,3}use (?:(?:function|const) )?(.*);/mg;
    let match;
    let matches = [];
    let isAlias = false;
    while (match = regEx.exec(text)) {
        let found = 0;
        let splitNameSpace = match[1].split('\\');
        let className = splitNameSpace[splitNameSpace.length - 1];
        if (className.search(/ as /) > -1) {
            isAlias = true;
            let splitAlias = className.split(' as ');
            className = splitAlias[splitAlias.length - 1].trim();
        }
        const reg = new RegExp('\\b' + className + '\\b', 'g');
        const test = text.match(reg);
        found = (test || []).length;
        if (match[0].length && found < 2) {
            matches.push({
                found: found,
                match,
            });
        }
        isAlias = false;
    }
    return matches;
}
exports.oldExtractor = oldExtractor;
//# sourceMappingURL=oldExtractor.js.map