"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const assert = __importStar(require("assert"));
const path = __importStar(require("path"));
const dataProvider_1 = require("../../test/dataProvider");
const extractUnusedImports_1 = require("../../src/extractUnusedImports");
const testFolderLocation = '/../../test/examples/';
describe('php import checker', () => {
    describe('handle php with valid syntax', () => {
        dataProvider_1.dataProvider.forEach((testCase) => {
            it('Should identify when there is no used class in a text, snippet:::' + testCase.snippet, () => __awaiter(void 0, void 0, void 0, function* () {
                var phpFile = fs.readFileSync(path.join(__dirname + testFolderLocation + testCase.snippet));
                const foundUnused = (0, extractUnusedImports_1.extractUnusedImports)(phpFile.toString(), {});
                assert.equal(foundUnused.length, testCase.unused);
            }));
        });
    });
    describe('use_next_version: handle php with valid syntax', () => {
        [
            ...dataProvider_1.dataProvider,
            ...dataProvider_1.dataProviderNextVersion
        ].forEach((testCase) => {
            it('Should identify when there is no used class in a text, snippet:::' + testCase.snippet, () => __awaiter(void 0, void 0, void 0, function* () {
                var phpFile = fs.readFileSync(path.join(__dirname + testFolderLocation + testCase.snippet));
                const foundUnused = (0, extractUnusedImports_1.extractUnusedImports)(phpFile.toString(), { use_next_version: true });
                assert.equal(foundUnused.length, testCase.unused);
            }));
        });
    });
});
//# sourceMappingURL=extractor.test.js.map