import * as vscode from 'vscode';
import Indenter from './Indenter';

const indent = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, thisArg: any): void => {
	formatText(textEditor, edit);
};

const indentWithPivot = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, thisArg: any): void => {
	formatText(textEditor, edit, true);
};

/**
 * Perform indention and replacement
 */
const formatText = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, centerJustified: boolean = false) => {
	const doc = textEditor.document;
	const sel = textEditor.selection;
	const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('readableIndent');

	try {
		const firstLine = doc.lineAt(sel.start.line);
		const lastLine = doc.lineAt(sel.end.line);

		// ensure that entire lines are being replaced as the granularity is line-based
		const expandedSelection = new vscode.Range(firstLine.lineNumber, 0, lastLine.lineNumber + 1, 0);
		// use the Indenter to munge the full selection
		const replace = new Indenter(doc.getText(expandedSelection), config);
		// pass in context like `tabSize`
		replace.textEditorOptions = textEditor.options;
		// tell Indenter instance to use left or center justification
		replace.centerJustify = centerJustified;
		// replace with indented code
		edit.replace(expandedSelection,  replace.indent());
		// re-select the newly replaced lines to keep visual context in editor
		textEditor.selection = new vscode.Selection(expandedSelection.start, expandedSelection.end);
	}	catch (e) {
		vscode.window.showInformationMessage(`${e.message}\n\nPlease report to https://github.com/cnojima/vscode-extension-readable-indent/issues`);
		console.error(e);
	}
};

/**
 * VSCode activation registers relevant commands - this extension requires a text selection
 * @param context
 */
export function activate(context: vscode.ExtensionContext) {
	const commands: vscode.Disposable[] = [];

	// https://vscode-docs.readthedocs.io/en/stable/extensionAPI/vscode-api/#commands.registerTextEditorCommand
	commands.push(vscode.commands.registerTextEditorCommand("extension.readableIndent.indent", indent));
	commands.push(vscode.commands.registerTextEditorCommand("extension.readableIndent.indentWithPivot", indentWithPivot));

	context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
