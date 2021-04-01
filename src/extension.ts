import * as vscode from 'vscode';
import {workingDirectory} from './workingDirectory';
import {currentFile} from './currentFile';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(workingDirectory, currentFile);
}

// this method is called when your extension is deactivated
export function deactivate() {}
// 监听文件变化，若setting文件改了，则重新读取配置