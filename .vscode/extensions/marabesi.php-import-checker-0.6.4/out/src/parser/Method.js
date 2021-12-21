"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Method = void 0;
const lodash_1 = require("lodash");
const Expression_1 = require("./Expression");
class Method {
    constructor(parsedMethods) {
        this.parsedMethods = parsedMethods;
        this.methods = (0, lodash_1.flatMap)(parsedMethods.map((body) => body));
    }
    normalizeReturnTypes() {
        return this.methods
            .map((method) => method && method.type ? method.type.name : null)
            .filter(returnType => returnType !== null);
    }
    extractClassesFromBody(methods) {
        const unusedImports = [];
        const bodyMethods = this.flatBody(methods);
        bodyMethods
            .map((item) => item && item.expr && item.expr.what ? item.expr.what.name : [])
            .forEach((item) => unusedImports.push(item));
        const expression = new Expression_1.Expression(bodyMethods);
        const unused = expression.normalizeExpressions();
        return [
            ...unusedImports,
            ...unused,
        ];
    }
    normalizeCallInsideMethods() {
        const unusedImports = [];
        const bodyMethods = this.flatBody(this.methods);
        const callInsideMethods = bodyMethods
            .map(item => item && item.expr ? item.expr.arguments : []);
        bodyMethods
            .map(item => item && item.expr && item.expr.what ? item.expr.what.name : [])
            .forEach((item) => unusedImports.push(item));
        const callbacks = [];
        for (const argumentsCall of callInsideMethods) {
            if (argumentsCall) {
                argumentsCall.forEach((argument) => {
                    if (argument && argument.kind === 'closure') {
                        callbacks.push(argument);
                    }
                });
                argumentsCall.map((item) => item.name)
                    .filter((item) => item !== null)
                    .forEach((item) => unusedImports.push(item));
            }
        }
        const unusedFromCallbacks = this.extractClassesFromBody(callbacks);
        return [...unusedImports, ...unusedFromCallbacks];
    }
    normalizeMethodArgumentList() {
        const methodStructure = (0, lodash_1.flatMap)(this.methods.map((body) => body));
        const argumentsFromMethods = (0, lodash_1.flatMap)(methodStructure.map((method) => method.arguments));
        const argumentList = argumentsFromMethods.map(argument => argument ? argument.type : [])
            .map((argument) => argument ? argument.name : null)
            .filter(argument => argument !== null);
        return argumentList;
    }
    normalizeMethodCalls() {
        return (0, lodash_1.flatMap)(this.methods.map((body) => (body && body.body ? body.body.children : [])))
            .filter(invokation => invokation && invokation.expression ? invokation.expression.kind === 'call' : null)
            .filter(invokation => invokation !== null)
            .map(invokation => invokation.expression.what.name);
    }
    flatBody(methods) {
        return (0, lodash_1.flatMap)(methods.map((body) => (body && body.body ? body.body.children : [])));
    }
}
exports.Method = Method;
//# sourceMappingURL=Method.js.map