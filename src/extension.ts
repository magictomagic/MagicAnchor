import * as vscode from 'vscode';
import {filelist, getIDlist} from './getAnchorID';
import {reWriteFiles} from './lineGenerator';
// import {}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('MagicAnchor.workingDirectory', async () => {
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
			placeHolder: picklist[0] || 'you have not created any valide anchor on current workspace or your current file is not opened as a part of working directory',
		});
		const params = await vscode.window.showInputBox({
			value: "input your pamams",
			placeHolder: 'use space to split',
		}) || "###";
		// if (params === '###'){
		// 	vscode.window.showInformationMessage('')
		// }
		let paramsList = params.split(' ');
		vscode.window.showInformationMessage(anchorID + '\n' + filelist.toString() + '\n' + paramsList.toString());
		console.log(anchorID);
		console.log(filelist.toString()); // 这里不对
		console.log(paramsList.toString());
		// reWriteFiles()
		filelist.forEach((fileLocation) => {
			return reWriteFiles(fileLocation, paramsList, anchorID || "root");
		});

		// anchorID: string, indexIDpathList: string[], paramsList: string[] 
		
	});
	let disposable1 = () =>{
		vscode.window.showInformationMessage('小爷我还没开发呢！');
	};

	context.subscriptions.push(disposable);
	context.subscriptions.push(vscode.commands.registerCommand('MagicAnchor.currentFile', disposable1));
}


// this method is called when your extension is deactivated
export function deactivate() {}
