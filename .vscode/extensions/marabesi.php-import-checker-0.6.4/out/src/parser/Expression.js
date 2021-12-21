"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
class Expression {
    constructor(expressions) {
        this.expressions = expressions;
    }
    normalizeExpressions() {
        const exceptions = this.expressions.filter((expression) => expression && expression.kind && expression.kind === 'throw');
        const catches = this.expressions.filter((expression) => expression && expression.kind && expression.kind === 'catch');
        const expressionsCalls = this.expressions.filter((expression) => expression && expression.expression ? expression.expression.kind === 'call' : false);
        const expressionsAssigments = this.expressions.filter((expression) => expression && expression.expression ? expression.expression.kind === 'assign' : false);
        const unusedImports = [];
        exceptions.forEach((expression) => {
            if (expression && expression.what && expression.what.what) {
                unusedImports.push(expression.what.what.name);
            }
        });
        catches.forEach((expression) => {
            if (expression && expression.what && expression.what.length > 0) {
                expression.what.forEach((what) => {
                    unusedImports.push(what.name);
                });
            }
        });
        expressionsCalls.forEach((expression) => {
            if (expression && expression.expression && expression.expression.what && expression.expression.what.what) {
                unusedImports.push(expression.expression.what.what.name);
            }
        });
        expressionsAssigments.forEach((expression) => {
            if (expression && expression.expression && expression.expression.right && expression.expression.right.what) {
                unusedImports.push(expression.expression.right.what.name);
            }
        });
        return unusedImports;
    }
}
exports.Expression = Expression;
//# sourceMappingURL=Expression.js.map