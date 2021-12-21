"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
class Expression {
    constructor(expressions) {
        this.expressions = expressions;
    }
    normalizeExpressions() {
        const expressionsCalls = this.expressions.filter((expression) => expression.expression.kind === 'call');
        const expressionsAssigments = this.expressions.filter((expression) => expression.expression.kind === 'assign');
        const unusedImports = [];
        expressionsCalls.forEach((expression) => {
            if (expression && expression.expression && expression.expression.what && expression.expression.what.what) {
                unusedImports.push(expression.expression.what.what.name);
            }
        });
        expressionsAssigments.forEach((expression) => {
            if (expression && expression.expression && expression.expression.right) {
                unusedImports.push(expression.expression.right.what.name);
            }
        });
        return unusedImports;
    }
}
exports.Expression = Expression;
//# sourceMappingURL=Expression.js.map