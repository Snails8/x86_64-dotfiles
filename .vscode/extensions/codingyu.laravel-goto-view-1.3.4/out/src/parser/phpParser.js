"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let engine = require('php-parser');
let options = {
    parser: {
        debug: false,
        php7: true,
        extractDoc: false,
        suppressErrors: true
    },
    ast: {
        withPositions: true
    },
    lexer: {
        all_tokens: true,
        comment_tokens: false,
        mode_eval: false,
        asp_tags: false,
        short_tags: false
    }
};
const parser = new engine(options);
exports.default = parser;
//# sourceMappingURL=phpParser.js.map