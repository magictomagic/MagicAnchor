import * as fs from 'fs';
import * as path from 'path';
import { ignore } from './anchorignore';
// 读取文件的逻辑拉出
function fsReadDir (dir: string) {
//   console.log(dir)
  if ([...ignore.directory, ...ignore.files].includes(dir.split('\\')[0])) {return;};
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {reject(err);};
      resolve(files);
    });
  });
}
// 获取fs.stats的逻辑拉出
function fsStat (path: string) {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) {reject(err);};
      resolve(stat);
    });
  });
}
// 搜索文件主方法

function getList(){
    let filesList:string[] = [];
    function saveFilePath(f:string){
        filesList.push(f);
    }
    function getFilePath(){
        return filesList;
    }
    return {saveFilePath, getFilePath};
}

let gl = getList();
// gl('asda');

let lst:string[] = [];

const fileSearch = async (dirPath: string) => {
  const files = await fsReadDir(dirPath);
  if (files) {
    const promises = files.map(file => {
      return fsStat(path.join(dirPath, file));
    });
    const datas = await Promise.all(promises).then(stats => {
      for (let i = 0; i < files.length; i += 1) {files[i] = path.join(dirPath, files[i]);};
      return { stats, files };
    });
    datas.stats.forEach(async stat => {
      const isFile = stat.isFile();
      const isDir = stat.isDirectory();
      if (isDir) {
        await fileSearch(datas.files[datas.stats.indexOf(stat)]);
      }
      if (isFile) {
          console.log(datas.files[datas.stats.indexOf(stat)]);
        //   await gl.saveFilePath(datas.files[datas.stats.indexOf(stat)]);
          lst.push(datas.files[datas.stats.indexOf(stat)]);
        };
    });
  }
};



// fileSearch('./');

const hookPaths = async () => {
    // let gl = getList();
    await fileSearch('./');
    console.log(gl.getFilePath());
    console.log(lst);
};

hookPaths();

export {fileSearch};
