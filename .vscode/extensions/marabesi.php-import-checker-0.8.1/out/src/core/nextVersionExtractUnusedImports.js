"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newExtractor = exports.classUsed = void 0;
const Builder_1 = require("../parser/Builder");
const classUsed = (className) => new RegExp('\\b' + className + '\\b', 'g');
exports.classUsed = classUsed;
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
            const test = text.match((0, exports.classUsed)(className));
            found = (test || []).length;
            const classesInNamespace = allUsedClasses.match((0, exports.classUsed)(className)) || [];
            if (found <= classesInNamespace.length) {
                matches.push({
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
exports.newExtractor = newExtractor;
//# sourceMappingURL=nextVersionExtractUnusedImports.js.map