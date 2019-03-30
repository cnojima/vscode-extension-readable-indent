import * as vscode from 'vscode';
import Indenter from './Indenter';

const config = vscode.workspace.getConfiguration('readableIndent');

/**
 * VSCode activation registers relevant commands - this extension requires a text selection
 * @param context
 */
export function activate(context: vscode.ExtensionContext) {
	const commands: vscode.Disposable[] = [];

	console.log(config);

	// POC test activation - does nothing
	commands.push(vscode.commands.registerCommand('extension.readableIndent', () => {
		vscode.window.showInformationMessage('Readable Indent activated!');
	}));

	// https://vscode-docs.readthedocs.io/en/stable/extensionAPI/vscode-api/#commands.registerTextEditorCommand
	commands.push(vscode.commands.registerTextEditorCommand("extension.readableIndent.indent", indent));
	commands.push(vscode.commands.registerTextEditorCommand("extension.readableIndent.indentWithPivot", indentWithPivot));

	context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}

const indent = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, thisArg: any): void => {
	formatText(textEditor, edit);
};

const indentWithPivot = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, thisArg: any): void => {
	formatText(textEditor, edit, true);
};

/**
 * Perform indention and replacement
 */
const formatText = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, onPivot: boolean = false) => {
	try {
		const firstLine = textEditor.document.lineAt(textEditor.selection.start.line);
		const lastLine = textEditor.document.lineAt(textEditor.selection.end.line);
		const expandedSelection = new vscode.Range(firstLine.lineNumber, firstLine.range.start.character, lastLine.lineNumber, lastLine.range.end.character);
		const replace = new Indenter(textEditor.document.getText(expandedSelection));
		replace.pivot = onPivot;
		const newCode = replace.indent();

		// textEditor.selection = new vscode.Selection(expandedSelection.start, expandedSelection.end);
		edit.replace(textEditor.selection, newCode);
		textEditor.selection = new vscode.Selection(expandedSelection.start, expandedSelection.end);
	}	catch (e) {
		vscode.window.showInformationMessage(e.message);
		console.error(e);
	}
};