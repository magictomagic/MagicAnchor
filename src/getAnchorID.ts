import * as fs from 'fs';
import {throughdirectory, filelist} from './getFiles';
const anchorIDs = new Set<string>();
let indexIDpathList: string[] = [];
const getIDs = (absPath: string, data: string) => {
  const block = data.split(/\r\n|\r|\n/);
  block.forEach((line: string, index: number) => {
    let lv = line.trim();
    if (lv && lv[0] && lv[1] && lv[0] === '/' && lv[1] === '/') {
      lv = lv.substr(2).trim();
      if (lv.length >= 6 && lv.substr(0, 6).toLowerCase() === 'anchor') {
        lv = lv.substr(6).trim();
        if (lv && lv.length > 4 && lv[0] === ':') {
          lv = lv.substr(1).trim();
          let author = '';
          const len = lv.length; let i = 0;
          for (; i < len; i++) {
            if (lv[i] === ' ') {
              author = lv.substring(0, i);
              indexIDpathList.push(absPath);
              break;
            }
          }
          anchorIDs.add(author);
        } else {
          console.log('syntax not supported');
        }
      }
    }
  });
};

let idlist: string[];

const getIDlist = (dir: string = './') => {
  throughdirectory(dir);
  filelist.forEach((path) => {
    const data = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    getIDs(dir, data);
  });
  idlist = Array.from(anchorIDs);
  // console.log(idlist);
  return idlist;
};
let wk = '/c:/Users/magic/Desktop/asd';
wk = wk.substr(1).split('/').join('\\');


console.log(getIDlist(wk));

console.log(filelist); // 这里不对
export {filelist, getIDlist};