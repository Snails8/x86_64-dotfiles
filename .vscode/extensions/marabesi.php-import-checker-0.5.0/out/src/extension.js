/**
 * For further reference, this extension was based on the decorator-sample
 * available at https://github.com/Microsoft/vscode-extension-samples/blob/master/decorator-sample/src/extension.ts
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const configuration_1 = require("./configuration");
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
        currentDecoration = configuration_1.setupConfiguration();
    }, null, context.subscriptions);
    let disposable = vscode.commands.registerCommand('extension.php-import-checker', () => {
        generateHighlighting();
    });
    context.subscriptions.push(disposable);
    currentDecoration = configuration_1.setupConfiguration();
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
    findMatch(editor, text);
    highlightSelections(editor);
}
function findMatch(editor, text) {
    const regEx = /^\ {0,3}use (?:(?:function|const) )?(.*);/mg;
    let match;
    let matches = [];
    let isAlias = false;
    while (match = regEx.exec(text)) {
        let found = 0;
        let splitNameSpace = match[1].split('\\');
        let className = splitNameSpace[splitNameSpace.length - 1];
        if (className.search(/ as /) > -1) {
            isAlias = true;
            let splitAlias = className.split(' as ');
            className = splitAlias[splitAlias.length - 1].trim();
        }
        const reg = new RegExp('\\b' + className + '\\b', 'g');
        const test = text.match(reg);
        found = (test || []).length;
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        if (match[0].length && found < 2) {
            matches.push({
                isAlias: isAlias,
                classname: className,
                found: found,
            });
            ranges.push(new vscode.Range(startPos, endPos));
        }
        isAlias = false;
    }
    return matches;
}
exports.findMatch = findMatch;
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
//# sourceMappingURL=extension.js.map