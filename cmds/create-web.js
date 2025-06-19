const fs = require('fs');
const path = require('path');

const appname = process.argv[2];
const apppath = 'src/' + appname + '/'
const basepath = 'packages/base/'

//eslint配置
if (process.argv.includes("-eslint")){
  fs.copyFile(basepath + 'eslint.config.mjs', apppath + 'eslint.config.mjs', (err)=> {
    if (err) throw err;
  })
}
//nuxt config 配置
if (process.argv.includes("-config")){
  fs.copyFile(basepath + 'nuxt.config.ts', apppath + 'nuxt.config.ts', (err)=> {
    if (err) throw err;
  })
}

// package.json 处理, scripts，dependencies赋值
const basepackage = JSON.parse(fs.readFileSync(basepath + 'package.json','utf8'))
const apppackage = JSON.parse(fs.readFileSync(apppath + 'package.json','utf8'))

for (const key in basepackage.scripts) {
  apppackage.scripts[key] = basepackage.scripts[key]
}

for (const key in basepackage.dependencies) {
  apppackage.dependencies[key] = basepackage.dependencies[key]
}

fs.writeFileSync(apppath + 'package.json', JSON.stringify(apppackage, null, 4),'utf8')

// 通用目录及文件复制
const sourceDir = path.resolve(basepath);
const targetDir = path.resolve(apppath);

fs.readdirSync(sourceDir,{withFileTypes: true}).forEach((dirent)=>{
  if (dirent.isDirectory()) {
    const srcFolder = path.join(sourceDir, dirent.name);
    const destFolder = path.join(targetDir, dirent.name);

    fs.cpSync(srcFolder, destFolder, { recursive: true });
    console.log(`Copied folder: ${dirent.name}`);
  }
})

// 通用的组件,中间件拷贝
const basejson = JSON.parse(fs.readFileSync(basepath + 'base.json', 'utf8'))

const basecomponentpath = 'packages/components/'
const appcomponentpath = apppath + 'components/'
const appcomponentscsspath = apppath + 'scss/components/'
for (component in basejson.components){
  const currbasecomponentpath = path.resolve(basecomponentpath + component)
  const currappcomponentpath = path.resolve(appcomponentpath + component)
  const currappcsspath = path.resolve(appcomponentscsspath + component)
  fs.readdirSync(currbasecomponentpath, {withFileTypes: true}).forEach((dirent)=>{
    if (dirent.isDirectory() && dirent.name === 'component'){
      const srcFolder = path.join(currbasecomponentpath, dirent.name)
      const destFolder = path.json(currappcomponentpath, dirent.name)
      fs.cpSync(srcFolder, destFolder, { recursive: true });
    }
    if (dirent.isDirectory() && dirent.name === 'scss'){
      const srcFolder = path.join(currbasecomponentpath, dirent.name)
      const destFolder = path.json(currappcsspath, dirent.name)
      fs.cpSync(srcFolder, destFolder, { recursive: true });
    }
  })
}

