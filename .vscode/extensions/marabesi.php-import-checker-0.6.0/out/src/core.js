"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractUnusedImports = void 0;
const Builder_1 = require("./parser/Builder");
function extractUnusedImports(sourceCode) {
    const unused = [];
    try {
        const parsedContent = new Builder_1.Builder(sourceCode).build();
        const unusedImports = [
            ...parsedContent.expressions.normalizeExpressions(),
            ...parsedContent.methods.normalizeReturnTypes(),
            ...parsedContent.methods.normalizeMethodArgumentList(),
            ...parsedContent.methods.normalizeMethodCalls(),
            ...parsedContent.methods.normalizeCallInsideMethods(),
        ];
        const useStatements = parsedContent.namespaces.normalizeUseStatements();
        for (const useStatement of useStatements) {
            const classNameAndNamespace = useStatement.name.split('\\');
            const className = classNameAndNamespace[classNameAndNamespace.length - 1];
            if (!unusedImports.includes(className)) {
                unused.push(useStatement);
            }
        }
    }
    catch (error) {
        console.error(error);
    }
    return unused;
}
exports.extractUnusedImports = extractUnusedImports;
//# sourceMappingURL=core.js.map