import {workspace, window} from 'vscode';
import { ignore } from './anchorignore';
const difF = workspace.getConfiguration().get('magic-anchor.configure.defaultFilesIgnore');
const difD = workspace.getConfiguration().get('magic-anchor.configure.defaultDirectoriesIgnore');
const cF: string[] = workspace.getConfiguration().get('magic-anchor.configure.customizeFiles')!;
const cD: string[] = workspace.getConfiguration().get('magic-anchor.configure.customizeDirectories')!;

// console.log(difF);
// console.log(difD);
// console.log(cF);


let fds: string[] = [];

difF && fds.push(...ignore.files);
difD && fds.push(...ignore.directory);
console.log(fds);
// Array.from(cF);
fds.push(...cF);
fds.push(...cD);
// console.log(cF);
// console.log(typeof cF);
console.log(fds);
export {
    fds
};
