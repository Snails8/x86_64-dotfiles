"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhpClass = void 0;
const lodash_1 = require("lodash");
class PhpClass {
    constructor(useTree) {
        this.useTree = useTree;
    }
    normalizeClasses() {
        const classFeatures = [
            ...this.extractExtends(),
            ...this.extractImplements(),
            ...this.extractTraitUse(),
        ];
        const inheritance = classFeatures
            .map((item) => item ? item.name : '')
            .filter((item) => item !== '');
        return inheritance;
    }
    extractExtends() {
        const extended = this.useTree.map((phpClass) => {
            if (phpClass.extends) {
                return [phpClass.extends];
            }
            return [];
        });
        return (0, lodash_1.flatMap)(extended);
    }
    extractImplements() {
        const extended = this.useTree.map((phpClass) => {
            if (phpClass.implements) {
                return phpClass.implements;
            }
            return [];
        });
        return (0, lodash_1.flatMap)(extended);
    }
    extractTraitUse() {
        if (this.useTree && this.useTree.length > 0) {
            const traits = this.useTree.map((children) => {
                if (children) {
                    return children.body.filter((bodyItem) => bodyItem.kind === 'traituse');
                }
                return [];
            })
                .filter((usedTraits) => usedTraits.length > 0)
                .map((traitUse) => {
                const pullTraits = [];
                traitUse.forEach((trait) => {
                    trait.traits.forEach((traitName) => {
                        pullTraits.push(traitName);
                    });
                });
                return pullTraits;
            });
            return (0, lodash_1.flatMap)(traits);
        }
        return [];
    }
}
exports.PhpClass = PhpClass;
//# sourceMappingURL=PhpClass.js.map