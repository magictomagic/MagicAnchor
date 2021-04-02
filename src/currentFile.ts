import * as vscode from 'vscode';
import {getIDlistSingleFile} from './getAnchorID';
import {reWriteFiles} from './lineGenerator';
import {parseParams} from './parseParams';
let currentFile = vscode.commands.registerCommand('MagicAnchor.currentFile', async () =>{
    let wf = vscode.window.activeTextEditor?.document.fileName || "error";
    let picklist = getIDlistSingleFile(wf);
    const anchorID = await vscode.window.showQuickPick(picklist, {
        placeHolder : picklist[0] || 'you have not created any valide anchor on current file'
    });
    // console.log(wf);
    vscode.window.showInformationMessage(wf || "aaaaaa");
    const params = await vscode.window.showInputBox({
        value: "input your params",
        placeHolder: "use space to split",
    }) || "###";

    let paramsList = parseParams(params);
    reWriteFiles(wf, paramsList, anchorID || "");

}); 

export {currentFile};