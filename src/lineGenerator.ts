import * as fs from 'fs';
// import { readFileSync } from 'node:fs';
import * as path from 'path';

const bb  = {
    fileLocation: 'C:\\Users\\magic\\Desktop\\asd\\t1.ts',
    // data: "sdfasdfads \n // anchor: magic sdfads第四{65}fa{asda{{第一{10}}}}fsa第一{10}f第二{11}a第三{36}sdf第二{11}ada}}} asdfasdf \n asdfasdfas \n //anchor: magictomagic 打倒ccp",
    paramsList: ['111111111', '2222222', '3333333', '44444444'],
    authorID: 'magic'
};

const replacedBoilerplate = (fileLocation: string, data: string, paramsList: string[], authorID: string) => {
    const block = data.split(/\r\n|\r|\n/);
    let additionkey: number[] = []; let additionValue: string[] = [];
    const lines = block.map((line, index) => {
      let lv = line.trim();
      if (lv && lv[0] && lv[1] && lv[0] === '/' && lv[1] === '/') {
        lv = lv.substr(2).trim();
        if (lv.length >= 6 && lv.substr(0, 6).toLowerCase() === 'anchor') {
          lv = lv.substr(6).trim();
          if (lv && lv.length > 4 && lv[0] === ':') {
            lv = lv.substr(1).trim();
            // authors' name cannot have Spaces
            let author = ''; let boilerplate = ''; const len = lv.length; let i = 0;
            for (; i < len; i++) {
              if (lv[i] === ' ') {
                author = lv.substring(0, i);
                boilerplate = lv.substr(i).trim();
                break;
              }
            }
            if (author !== authorID) {
              ;
              // additionkey.push(index);
              // additionValue.push('');
            }else{
              let plate = boilerplate;
              let paralen = new Set();
              console.log(boilerplate);
              let stack = 0, bl = boilerplate.length, tmp = '', numStart = 0; i = 0;
              for(; i < bl; i++){
                tmp = boilerplate[i]; 
                if(tmp === '{'){
                  stack ++;
                  numStart = i;
                  // console.log(numStart);
                }else if(stack > 0){
                  if(Number(tmp) || tmp === '0'){
                    // 你知道 发现 tmp === '0' 我这个db花了多长时间吗？
                  }else{
                    if(tmp === '}'){
                      stack = 0;
                      paralen.add(Number(boilerplate.substring(numStart+1, i)));
                      // console.log(boilerplate.substring(numStart+1, i));
                    }else{
                      stack = 0;
                      // console.log("object: " + tmp);
                    }
                  }
                }
              }
              let pli = Array.from(paralen), pll = pli.length;
              if(paramsList.length < pll){
                console.log("param too much");
                pll = paramsList.length;
              }else if(paramsList.length > pll){
                console.log("param too little");
              }
              let j = 0;
              pli.sort();
              for(; j < pll; j++){
                const re = new RegExp('\\{' + pli[j] + '\\}', 'g');
                plate = plate.replace(re, paramsList[j]);
              }
              console.log(plate);
              additionValue.push(plate);
              additionkey.push(index);
            }
          } else {
            console.log('syntax not supported');
          }
        }
      }
      return line;
    });
  
    return { lines, additionkey, additionValue };
  };

//   console.log(bb.data);
// replacedBoilerplate(bb.fileLocation, bb.data, bb.paramsList, bb.authorID);
const reWriteFiles = (fileLocation: string, paramsList: string[], authorID: string) => {
  const data = fs.readFileSync(fileLocation, { encoding: 'utf8', flag: 'r' });
    let { lines, additionkey, additionValue } = replacedBoilerplate(fileLocation, data, paramsList, authorID);
    let output = ''; let i = 0; let offset = 0; const len = lines.length;
    // author还没用起来
    // console.log(lines);
    // console.log(additionkey);
    // console.log(additionValue);
    // if(additionkey.length > 0 && additionkey[0] === -1) {return true;};
    for (; i < len; i++) {
      if (additionkey.includes(i)) {
        lines[i] = additionValue[offset++] + '\n' + lines[i];
      }
    }
    output = lines.join('\n');
    fs.writeFile(fileLocation, output, (err) => {
      if (err) {
        console.log(err);
        return false;
      } else {
        console.log('updated: ' + fileLocation);
        return true;
      }
    });
    // console.log(output);
  };

reWriteFiles(bb.fileLocation, bb.paramsList, bb.authorID);
export {reWriteFiles};