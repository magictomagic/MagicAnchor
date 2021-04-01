import * as fs from 'fs';
import * as path from 'path';
import {fds} from './getSetting';
let filelist: string[]  = [];
// let wk = '/c:/Users/magic/Desktop/asd';
// wk = wk.substr(1).split('/').join('\\');

const throughdirectory = (directory:string) => {
    fs.readdirSync(directory).forEach(fileName => {
        let tmpArray = directory.split('\\');
        if(fds.includes(tmpArray[tmpArray.length - 1])) {return;};
        // console.log(directory.split('\\'));
        const absolute = path.join(directory, fileName);
        if (fs.statSync(absolute).isDirectory()) {return throughdirectory(absolute);}
        else {return filelist.push(absolute);}
    });
};

// throughdirectory(wk);
// console.log(filelist);
export {throughdirectory, filelist};
// console.log(filelist);