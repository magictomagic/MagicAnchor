import * as fs from 'fs';
import * as path from 'path';
import { ignore } from './anchorignore';
let filelist: string[]  = [];
// let wk = '/c:/Users/magic/Desktop/asd';
// wk = wk.substr(1).split('/').join('\\');
const throughdirectory = (directory:string) => {
    fs.readdirSync(directory).forEach(fileName => {
        if([...ignore.directory, ...ignore.files].includes(directory.split('\\')[0])) {return;};
        const absolute = path.join(directory, fileName);
        if (fs.statSync(absolute).isDirectory()) {return throughdirectory(absolute);}
        else {return filelist.push(absolute);}
    });
};

// throughdirectory(wk);
// console.log(filelist);
export {throughdirectory, filelist};
// console.log(filelist);