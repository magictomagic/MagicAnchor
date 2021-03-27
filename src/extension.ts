// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { link } from 'node:fs';
import * as vscode from 'vscode';
import {getIDlist} from './getAnchorID';

// console.log();

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

		let wf = '';
		// If you need the File use uri.fsPath If you need the Workspace Folder use uri.path
		if(vscode.workspace.workspaceFolders !== undefined) {
			wf = vscode.workspace.workspaceFolders[0].uri.path! ;
			// let f = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
			// message = `YOUR-EXTENSION: folder: ${wf} - ${f}` ;
			// vscode.window.showInformationMessage(message);
		} else {
			vscode.window.showInformationMessage("YOUR-EXTENSION: Working folder not found, open a folder an try again");
		}
		// console.log(wf);
		// vscode.window.showInformationMessage(wf);
		// console.log("111111111111111111111");
		// vscode.window.showInformationMessage('1111111');
		wf = wf.substr(1).split('/').join('\\');
		// console.log("aaaaaaaaaaaaaaa");
		console.log(wf);
		// vscode.window.showInformationMessage("bbbbbbbbbbbbbb");
		// console.log("bbbbbbbbbbbbb");
		// vscode.window.showInformationMessage(wf);
		// console.log((getIDlist(wf)));

		let picklist = getIDlist(wf);

		const result = await vscode.window.showQuickPick(picklist, {
			placeHolder: picklist[0] || 'you have not created any valide anchor on current workspace or you current file is not opened as a working directory',
			// onDidSelectItem: item => vscode.window.showInformationMessage(`you chosed anchor ID: ${item}`)
		});
		vscode.window.showInformationMessage(`you chosed anchor ID: ${result}`);
		// const result = await vscode.window.showInputBox({
		// 	value: 'input your anchor id',
		// 	placeHolder: 'input your anchor id',
		// 	validateInput: text => {
		// 		// vscode.window.showInformationMessage(`Validating: ${text}`);
		// 		return text === '123' ? 'Not 123!' : null;
		// 	}
		// });

		// vscode.window.showInformationMessage(`Got: ${result}`);
		// const params = await vscode.window.showInputBox({
		// 	value: "input your pamams",
		// 	placeHolder: 'use space to split',
		// 	// validateInput: text => {
		// 	// 	return text.length > 0;
		// 	// }
		// });
		// vscode.window.showInformationMessage(`${params}`);
		// console.log(result);
		// console.log(params?.split(' '));
		
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
