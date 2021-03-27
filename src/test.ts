import * as fs from 'fs';
import * as path from 'path';
import { getIDs } from './getAnchorID';

// console.log(__dirname);
// console.log(path.join(__dirname, '/asd/'));
// const anchorList = getIDs(path.join(__dirname, '/asd/'));
// console.log(anchorList);
// console.log(getIDs('./asd/'));
fs.readdirSync(__dirname, { withFileTypes: true }).forEach(
    file => {
        
      console.log(path.join(__dirname, file.name));
    }
  );