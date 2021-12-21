"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUnusedImports = void 0;
const Builder_1 = require("./parser/Builder");
function newExtractor(text) {
    var _a, _b, _c, _d;
    let matches = [];
    try {
        const builder = new Builder_1.Builder(text);
        const ast = builder.build().namespaces.normalizeUseStatements();
        const allUsedClasses = ast.map(node => node.name).join(',');
        for (const use of ast) {
            let found = 0;
            let splitNameSpace = use.name.split('\\');
            let className = splitNameSpace[splitNameSpace.length - 1];
            const reg = new RegExp('\\b' + className + '\\b', 'g');
            const test = text.match(reg);
            found = (test || []).length;
            const classesInNamespace = allUsedClasses.match(new RegExp('\\b' + className + '\\b', 'g')) || [];
            if (found <= classesInNamespace.length) {
                matches.push({
                    classname: className,
                    found: found,
                    match: {
                        index: (_b = (_a = use === null || use === void 0 ? void 0 : use.loc) === null || _a === void 0 ? void 0 : _a.start.offset) !== null && _b !== void 0 ? _b : 0,
                        0: {
                            length: ((_d = (_c = use === null || use === void 0 ? void 0 : use.loc) === null || _c === void 0 ? void 0 : _c.end.column) !== null && _d !== void 0 ? _d : 0) - 2,
                        }
                    },
                });
            }
        }
    }
    catch (e) {
        console.log(e);
    }
    return matches;
}
function extractUnusedImports(text, configuration) {
    if (configuration.use_next_version) {
        return newExtractor(text);
    }
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
                isAlias: isAlias,
                classname: className,
                found: found,
                match,
            });
        }
        isAlias = false;
    }
    return matches;
}
exports.extractUnusedImports = extractUnusedImports;
//# sourceMappingURL=extractUnusedImports.js.map