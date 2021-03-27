// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { link } from 'node:fs';
import * as vscode from 'vscode';
import {indexIDpathList, getIDlist} from './getAnchorID';

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
		} else {
			vscode.window.showInformationMessage("YOUR-EXTENSION: Working folder not found, open a folder an try again");
		}
		wf = wf.substr(1).split('/').join('\\');
		console.log(wf);
		let picklist = getIDlist(wf);
		const anchorID = await vscode.window.showQuickPick(picklist, {
			placeHolder: picklist[0] || 'you have not created any valide anchor on current workspace or you current file is not opened as a working directory',
		});
		// vscode.window.showInformationMessage(`you chosed anchor ID: ${result}`);
		console.log(indexIDpathList);
		// vscode.window.showInformationMessage(indexIDpathList.toString());
		// vscode.window.showInformationMessage(`Got: ${result}`);
		const params = await vscode.window.showInputBox({
			value: "input your pamams",
			placeHolder: 'use space to split',
			// validateInput: text => {
			// 	return text.length > 0;
			// }
		}) || "###";
		// vscode.window.showInformationMessage(`${params}`);
		// console.log(result);
		let paramsList = params.split(' ');
		vscode.window.showInformationMessage(anchorID + '\n' + indexIDpathList.toString() + '\n' + paramsList.toString());
		// console.log(anchorID);
		// console.log(indexIDpathList.toString());
		// console.log(paramsList.toString());

		// anchorID: string, indexIDpathList: string[], paramsList: string[] 
		
	});
	

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
