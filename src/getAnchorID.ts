import * as fs from 'fs';
import * as path from 'path';
import {fileSearch} from './getFiles';
const authorIDs = new Set();
const replacedBoilerplate = (fileLocation: string, data: string) => {
  const block = data.split(/\r\n|\r|\n/);
  const additionkey: [] = []; const additionValue: [] = [];
  const lines = block.forEach((line: string, index: number) => {
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
              break;
            }
          }
          authorIDs.add(author);
        } else {
          console.log('syntax not supported');
        }
      }
    }
  });
  return { lines, additionkey, additionValue };
};
const filesList = fileSearch('./');
filesList.array.forEach(element => {
  
});
// const getIDs = () => {
//   filesList.forEach(
//     file => {
//       const absPath = path.join(__dirname, file);
//       console.log(absPath);
//       // const data = fs.readFileSync(absPath, { encoding: 'utf8', flag: 'r' });
//       // replacedBoilerplate(absPath, data);
//     }
//   );
//   return Array.from(authorIDs);
// };
// const getIDs = () => "dasdasd";
// console.log(getIDs());
// export { getIDs };
