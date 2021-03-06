import * as vscode from 'vscode';
import {filelist, getIDlist} from './getAnchorID';
import {reWriteFiles} from './lineGenerator';
import {parseParams} from './parseParams';

let workingDirectory = vscode.commands.registerCommand('MagicAnchor.workingDirectory', async () => {
    let wf = '';
    // If you need the File use uri.fsPath If you need the Workspace Folder use uri.path
    if(vscode.workspace.workspaceFolders !== undefined) {
        wf = vscode.workspace.workspaceFolders[0].uri.path! ;
        // let f = vscode.workspace.workspaceFolders[0].uri.fsPath ; 
    } else {
        vscode.window.showInformationMessage("YOUR-EXTENSION: Working folder not found, open a folder an try again");
    }
    wf = wf.substr(1).split('/').join('\\');
    // console.log(wf);
    let picklist = getIDlist(wf);
    const anchorID = await vscode.window.showQuickPick(picklist, {
        placeHolder: picklist[0] || 'you have not created any valide anchor on current workspace or your current file is not opened as a part of working directory',
    });
    const params = await vscode.window.showInputBox({
        value: "input your pamams",
        placeHolder: 'use space to split',
    }) || "###";

    let paramsList = parseParams(params);
    // let paramsList = params.split(' ');
    // vscode.window.showInformationMessage(anchorID + '\n' + filelist.toString() + '\n' + paramsList.toString());
    filelist.forEach((fileLocation) => {
        return reWriteFiles(fileLocation, paramsList, anchorID || "root");
    });
});
export {workingDirectory};