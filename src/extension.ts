// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { link } from 'node:fs';
import * as vscode from 'vscode';
import {getIDs} from './getAnchorID';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "MagicAnchor" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('MagicAnchor.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed

		const result = await vscode.window.showInputBox({
			value: 'abcdef',
			valueSelection: [2, 4],
			placeHolder: 'For example: fedcba. But not: 123',
			validateInput: text => {
				// vscode.window.showInformationMessage(`Validating: ${text}`);
				return text === '123' ? 'Not 123!' : null;
			}
		});
		vscode.window.showInformationMessage(`Got: ${result}`);
	});

	vscode.commands.registerCommand('extension.sayHello', async () => {
		// printDefinitionsForActiveEditor();
		let i = 0;
		getIDs('./asd/');
		// getIDs();
		let anchorList = ['adas', '1111'];
		console.log(anchorList);
		const result = await vscode.window.showQuickPick(anchorList, {
			placeHolder: 'eins, asdasdasdaszwei or drei',
			onDidSelectItem: item => item
			// vscode.window.showInformationMessage(`Focus ${++i}: ${item}`)
		});
		vscode.window.showInformationMessage(`Got: ${result}`);
	});

	function commentLine() {
		vscode.commands.executeCommand('editor.action.addCommentLine');
	  }

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

// async function printDefinitionsForActiveEditor() {
// 	const activeEditor = vscode.window.activeTextEditor;
// 	if (!activeEditor) {
// 	  return;
// 	}
  
// 	const definitions = await vscode.commands.executeCommand<vscode.Location[]>(
// 	  'vscode.executeDefinitionProvider',
// 	  activeEditor.document.uri,
// 	  activeEditor.selection.active
// 	);
  
// 	for (const definition of definitions) {
// 	  console.log(definition);
// 	  console.log("adasd");
// 	}
//   }