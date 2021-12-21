"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const lodash_1 = require("lodash");
class Namespace {
    constructor(useTree) {
        this.useTree = useTree;
    }
    normalizeUseStatements() {
        const extractUseItems = (0, lodash_1.flatMap)(this.useTree.map((usegroup) => usegroup.items));
        return extractUseItems
            .map((use) => {
            if (use.alias) {
                use.name = use.alias.name;
                use.loc = use.alias.loc;
                return use;
            }
            return use;
        });
    }
}
exports.Namespace = Namespace;
//# sourceMappingURL=Namespace.js.map