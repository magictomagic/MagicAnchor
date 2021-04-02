import {workspace, window} from 'vscode';
import { ignore } from './anchorignore';
const difF = workspace.getConfiguration().get('magic-anchor.configure.defaultFilesIgnore');
const difD = workspace.getConfiguration().get('magic-anchor.configure.defaultDirectoriesIgnore');
const cF: string[] = workspace.getConfiguration().get('magic-anchor.configure.customizeFiles') || [];
const cD: string[] = workspace.getConfiguration().get('magic-anchor.configure.customizeDirectories') || [];

// console.log(difF);
// console.log(difD);
// console.log(cF);


let iFs: string[] = [];
let iDs: string[] = [];

difF && iFs.push(...ignore.files);
difD && iDs.push(...ignore.directory);
// console.log("add ignore iFs: " + iFs.toString());
// console.log("add ignore iDs: " + iDs.toString());
// Array.from(cF);
iFs.push(...cF);
iDs.push(...cD);
// console.log(cF);
// console.log(typeof cF);
// console.log("total iFs: " + iFs.toString());
// console.log("total iDs: " + iDs.toString());

export {
    iFs,
    iDs
};
