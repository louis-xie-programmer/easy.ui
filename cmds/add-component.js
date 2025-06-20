const fs = require('fs');

if (process.length < 3) {
  throw error("argv is null or error")
}

const componentname = process.argv[2];

//组件拷贝
const currbasecomponentpath = '../packages/components/' + componentname + '/';
const currappcomponentpath = 'components/' + componentname + '/';
const currappcsspath = 'scss/components/' + componentname + '/';

if (!fs.existsSync(appcomponentpath)) {
  fs.mkdirSync(appcomponentpath, {recursive: true})
}

if (!fs.existsSync(appcomponentscsspath)) {
  fs.mkdirSync(appcomponentscsspath, {recursive: true})
}

fs.readdirSync(currbasecomponentpath, {withFileTypes: true}).forEach((dirent)=>{
  if (dirent.isDirectory() && dirent.name === 'component'){
    const srcFolder = path.join(currbasecomponentpath, dirent.name)
    fs.cpSync(srcFolder, currappcomponentpath, { recursive: true });
  }
  if (dirent.isDirectory() && dirent.name === 'scss'){
    const srcFolder = path.join(currbasecomponentpath, dirent.name)
    fs.cpSync(srcFolder, currappcsspath, { recursive: true });
  }
})
