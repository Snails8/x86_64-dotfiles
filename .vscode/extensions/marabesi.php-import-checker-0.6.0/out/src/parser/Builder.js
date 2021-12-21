"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const php_parser_1 = require("php-parser");
const Ast_1 = require("./Ast");
const Namespace_1 = require("./Namespace");
const Method_1 = require("./Method");
const Expression_1 = require("./Expression");
const parser = new php_parser_1.Engine({
    parser: {
        extractDoc: false,
    },
    ast: {
        withPositions: true
    },
    lexer: {
        comment_tokens: false
    }
});
class Builder {
    constructor(sourceCode) {
        this.sourceCode = sourceCode;
        this.parsedContent = parser.parseCode(this.sourceCode, '');
        this.walker = (0, Ast_1.walker)(this.parsedContent);
    }
    build() {
        return {
            namespaces: new Namespace_1.Namespace(this.walker.namespaces),
            methods: new Method_1.Method(this.walker.methods),
            expressions: new Expression_1.Expression(this.walker.expressions),
        };
    }
}
exports.Builder = Builder;
//# sourceMappingURL=Builder.js.map