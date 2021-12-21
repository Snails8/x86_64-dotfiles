"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walker = void 0;
const Nodes_1 = require("../types/Nodes");
function walker(nodes) {
    const classes = [];
    const methods = [];
    const namespaces = [];
    const expressions = [];
    function walk(nodes) {
        if (nodes.kind === Nodes_1.PhpTypes.PHP_EXPRESSION || nodes.kind === 'throw') {
            expressions.push(nodes);
        }
        if (nodes.kind === 'try') {
            nodes.catches.forEach((catchItem) => {
                expressions.push(catchItem);
                walk(catchItem);
            });
        }
        if (nodes.kind && nodes.body && nodes.body.children) {
            nodes.body.children.forEach((node) => walk(node));
        }
        if (nodes && nodes.kind === Nodes_1.PhpTypes.PHP_USE) {
            namespaces.push(nodes);
        }
        if (nodes.kind === Nodes_1.PhpTypes.PHP_CLASS) {
            classes.push(nodes);
        }
        if (nodes.body && (nodes.kind === Nodes_1.PhpTypes.PHP_CLASS || nodes.kind === Nodes_1.PhpTypes.PHP_TRAIT)) {
            methods.push(nodes.body);
            nodes.body.forEach((node) => walk(node));
        }
        if (nodes.kind === Nodes_1.PhpTypes.PHP_INTERFACE) {
            methods.push(nodes.body);
        }
        if (nodes.children) {
            nodes.children.forEach((node) => walk(node));
        }
    }
    walk(nodes);
    return {
        methods,
        namespaces,
        expressions,
        classes
    };
}
exports.walker = walker;
//# sourceMappingURL=Ast.js.map