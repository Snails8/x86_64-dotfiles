/**
 * For further reference, this extension was based on the decorator-sample
 * available at https://github.com/Microsoft/vscode-extension-samples/blob/master/decorator-sample/src/extension.ts
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.drawUnusedImports = exports.activate = void 0;
const vscode = require("vscode");
const configuration_1 = require("./configuration");
const core_1 = require("./core");
let currentDecoration = configuration_1.unusedNamespaceDecorationType;
let ranges = [];
function activate(context) {
    console.log('php-import-checker" is now active!');
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        generateHighlighting();
    }, null, context.subscriptions);
    vscode.workspace.onDidSaveTextDocument(callback => {
        generateHighlighting();
    }, null, context.subscriptions);
    vscode.workspace.onDidChangeConfiguration(e => {
        currentDecoration = (0, configuration_1.setupConfiguration)();
    }, null, context.subscriptions);
    let disposable = vscode.commands.registerCommand('extension.php-import-checker', () => {
        generateHighlighting();
    });
    context.subscriptions.push(disposable);
    currentDecoration = (0, configuration_1.setupConfiguration)();
    generateHighlighting();
}
exports.activate = activate;
function generateHighlighting() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || editor.document.languageId != 'php') {
        return;
    }
    console.log('Searching unused classes...');
    if (!editor) {
        return;
    }
    ranges = [];
    const text = editor.document.getText();
    resetDecorations(editor);
    drawUnusedImports(editor, text);
    highlightSelections(editor);
}
function drawUnusedImports(editor, text) {
    const unusedList = (0, core_1.extractUnusedImports)(text);
    console.log(`Found ${unusedList.length} unused classes (s)`);
    for (const drawUnused of unusedList) {
        if (drawUnused && drawUnused.loc) {
            const startPos = editor.document.positionAt(drawUnused.loc.start.offset.valueOf());
            const endPos = editor.document.positionAt(drawUnused.loc.end.offset.valueOf() + 1);
            ranges.push(new vscode.Range(startPos, endPos));
        }
    }
    return unusedList;
}
exports.drawUnusedImports = drawUnusedImports;
function resetAllDecorations() {
    vscode.window.visibleTextEditors.forEach(textEditor => {
        resetDecorations(textEditor);
    });
}
function resetDecorations(textEditor) {
    highlightSelections(textEditor);
}
function highlightSelections(editor) {
    editor.setDecorations(currentDecoration, ranges);
}
function deactivate() {
    resetAllDecorations();
}
exports.deactivate = deactivate;
//# sourceMappingURL=ui.js.map