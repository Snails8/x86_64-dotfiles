"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const assert = require("assert");
const path = require("path");
const dataProvider_1 = require("../../test/dataProvider");
const core_1 = require("../../src/core");
const testFolderLocation = '/../../test/examples/';
describe('extract unused', () => {
    dataProvider_1.dataProvider.forEach((testCase) => {
        it('Should identify when there is no used class in a text, snippet:::' + testCase.snippet, () => __awaiter(void 0, void 0, void 0, function* () {
            var phpFile = fs.readFileSync(path.join(__dirname + testFolderLocation + testCase.snippet));
            const foundUnused = (0, core_1.extractUnusedImports)(phpFile);
            assert.equal(testCase.unused, foundUnused.length);
        }));
    });
});
//# sourceMappingURL=extractor.test.js.map