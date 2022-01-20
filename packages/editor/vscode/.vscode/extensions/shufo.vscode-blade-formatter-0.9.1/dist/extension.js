/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/extension.ts":
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode_1 = __importDefault(__webpack_require__("vscode"));
const path_1 = __importDefault(__webpack_require__("path"));
const find_config_1 = __importDefault(__webpack_require__("find-config"));
const fs_1 = __importDefault(__webpack_require__("fs"));
const ignore_1 = __importDefault(__webpack_require__("ignore"));
const blade_formatter_1 = __webpack_require__("blade-formatter");
const { Range, Position } = vscode_1.default;
const vsctmModule = getCoreNodeModule("vscode-textmate");
const onigurumaModule = getCoreNodeModule("vscode-oniguruma");
const KNOWN_ISSUES = "Open known Issues";
const REPORT_ISSUE = "Report Issue";
const knownIssuesUrl = "https://github.com/shufo/vscode-blade-formatter/issues";
const newIssueUrl = "https://github.com/shufo/vscode-blade-formatter/issues/new";
const WASM_ERROR_MESSAGE = "Must invoke loadWASM first.";
let wasmInitialized = false;
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    context.subscriptions.push(vscode_1.default.languages.registerDocumentFormattingEditProvider("blade", {
        provideDocumentFormattingEdits(document) {
            if (shouldIgnore(document.uri.fsPath)) {
                return document;
            }
            const extConfig = vscode_1.default.workspace.getConfiguration("bladeFormatter.format");
            if (!wasmInitialized) {
                // onigurumaModule.initCalled = false;
                wasmInitialized = true;
            }
            const originalText = document.getText();
            const lastLine = document.lineAt(document.lineCount - 1);
            const range = new Range(new Position(0, 0), lastLine.range.end);
            if (!extConfig.enabled) {
                return [new vscode_1.default.TextEdit(range, originalText)];
            }
            const options = {
                vsctm: vsctmModule,
                oniguruma: onigurumaModule,
                indentSize: extConfig.indentSize,
                wrapLineLength: extConfig.wrapLineLength,
                wrapAttributes: extConfig.wrapAttributes,
                useTabs: extConfig.useTabs,
            };
            return new Promise((resolve, reject) => {
                return new blade_formatter_1.Formatter(options)
                    .formatContent(originalText)
                    .then((text) => {
                    resolve([new vscode_1.default.TextEdit(range, text)]);
                })
                    .then(undefined, (err) => {
                    var _a;
                    if (err.message === WASM_ERROR_MESSAGE) {
                        return reject(err);
                    }
                    (_a = vscode_1.default.window) === null || _a === void 0 ? void 0 : _a.showErrorMessage(err.message, KNOWN_ISSUES, REPORT_ISSUE).then((selected) => {
                        if (selected === KNOWN_ISSUES) {
                            vscode_1.default.env.openExternal(vscode_1.default.Uri.parse(knownIssuesUrl));
                        }
                        if (selected === REPORT_ISSUE) {
                            vscode_1.default.env.openExternal(vscode_1.default.Uri.parse(newIssueUrl));
                        }
                    });
                    reject(err);
                });
            });
        },
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
/**
 * Returns a node module installed with VSCode, or null if it fails.
 */
function getCoreNodeModule(moduleName) {
    try {
        // @ts-ignore
        return require(`${vscode_1.default.env.appRoot}/node_modules.asar/${moduleName}`);
    }
    catch (err) {
    }
    try {
        // @ts-ignore
        return require(`${vscode_1.default.env.appRoot}/node_modules/${moduleName}`);
    }
    catch (err) {
    }
    return null;
}
function shouldIgnore(filepath) {
    var _a, _b;
    const ignoreFilename = ".bladeignore";
    try {
        const ignoreFilePath = (0, find_config_1.default)(ignoreFilename, {
            cwd: path_1.default.dirname(filepath),
        });
        const ignoreFileContent = fs_1.default.readFileSync(ignoreFilePath).toString();
        const ig = (0, ignore_1.default)().add(ignoreFileContent);
        return (_b = (_a = vscode_1.default.workspace) === null || _a === void 0 ? void 0 : _a.workspaceFolders) === null || _b === void 0 ? void 0 : _b.find((folder) => {
            return ig.ignores(path_1.default.relative(folder.uri.fsPath, filepath));
        });
    }
    catch (err) {
        return false;
    }
}


/***/ }),

/***/ "blade-formatter":
/***/ ((module) => {

module.exports = require("blade-formatter");

/***/ }),

/***/ "find-config":
/***/ ((module) => {

module.exports = require("find-config");

/***/ }),

/***/ "ignore":
/***/ ((module) => {

module.exports = require("ignore");

/***/ }),

/***/ "vscode":
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/extension.ts");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map