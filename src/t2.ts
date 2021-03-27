import * as fs from 'fs';
import * as path from 'path';
// import {getIDlist} from './getAnchorID';
// let anchorList = getIDlist('./');
// console.log(__filename);
// console.log(anchorList);

let wk = '/c:/Users/magic/Desktop/asd';
wk = wk.substr(1).split('/').join('\\');
console.log(wk);
fs.readdirSync(wk);