import * as vscode from 'vscode';
import Indenter from './Indenter';



const indent = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, thisArg: any): void => {
	const options = textEditor.options;
	// console.log(JSON.stringify(options, null, 2));
	formatText(textEditor, edit);
};

const indentWithPivot = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, thisArg: any): void => {
	formatText(textEditor, edit, true);
};

/**
 * Perform indention and replacement
 */
const formatText = (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit, onPivot: boolean = false) => {
	const doc = textEditor.document;
	const sel = textEditor.selection;

	try {
		const firstLine = doc.lineAt(sel.start.line);
		const lastLine = doc.lineAt(sel.end.line);

		// ensure that entire lines are being replaced as the granularity is line-based
		const expandedSelection = new vscode.Range(firstLine.lineNumber, 0, lastLine.lineNumber + 1, 0);
		// use the Indenter to munge the full selection
		const replace = new Indenter(doc.getText(expandedSelection));
		// pass in context like `tabSize`
		replace.textEditorOptions = textEditor.options;
		// tell Indenter instance to use left or center justification
		replace.pivot = onPivot;
		// replace with indented code
		edit.replace(expandedSelection,  replace.indent());
		// re-select the newly replaced lines to keep visual context in editor
		textEditor.selection = new vscode.Selection(expandedSelection.start, expandedSelection.end);
	}	catch (e) {
		vscode.window.showInformationMessage(e.message);
		console.error(e);
	}
};

/**
 * VSCode activation registers relevant commands - this extension requires a text selection
 * @param context
 */
export function activate(context: vscode.ExtensionContext) {
	const commands: vscode.Disposable[] = [];

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
