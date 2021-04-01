import * as vscode from 'vscode';
// import {filelist, getIDlist} from './getAnchorID';
// import {reWriteFiles} from './lineGenerator';
let currentFile = vscode.commands.registerCommand('MagicAnchor.currentFile', async () =>{
    const configuration = vscode.workspace.getConfiguration();

    // 3) Get the current value
    const currentValue = configuration.get<string[]>('magic-anchor.configure.customizeDirectories');
    vscode.window.showInformationMessage(currentValue!.toString());

}); 

export {currentFile};