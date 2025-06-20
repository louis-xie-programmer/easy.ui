const { error } = require('console');
const fs = require('fs');
const path = require('path');


if (process.length < 3) {
  throw error("argv is null or error")
}

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

//组件拷贝
const basecomponentpath = 'packages/components/'
const appcomponentpath = apppath + 'components/'
const appcomponentscsspath = apppath + 'scss/components/'

if (basejson.components.length > 0 && !fs.existsSync(appcomponentpath)) {
  fs.mkdirSync(appcomponentpath, {recursive: true})
}

if (basejson.components.length > 0 && !fs.existsSync(appcomponentscsspath)) {
  fs.mkdirSync(appcomponentscsspath, {recursive: true})
}

basejson.components.forEach((component)=>{
  const currbasecomponentpath = path.resolve(basecomponentpath + component)
  const currappcomponentpath = path.resolve(appcomponentpath + component)
  const currappcsspath = path.resolve(appcomponentscsspath + component)
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
})

//中间件拷贝
const basemiddlewarepath = 'packages/middleware/'
const appmiddlewarepath = apppath + 'middleware/'

if (basejson.middlewares.length > 0 && !fs.existsSync(appcomponentpath)) {
  fs.mkdirSync(appmiddlewarepath, {recursive: true})
}
basejson.middlewares.forEach((middleware)=>{
  console.log(middleware,111)
  fs.copyFile(basemiddlewarepath + middleware, appmiddlewarepath, (err)=>{
    if (err) throw err;
  })
})

//layouts拷贝
const baselayoutpath = 'packages/layouts/'
const applayoutpath = apppath + 'layouts/'

if (basejson.layouts.length > 0 && !fs.existsSync(applayoutpath)) {
  fs.mkdirSync(applayoutpath, {recursive: true})
}
basejson.layouts.forEach((layout)=>{
  console.log(layout,111)
  fs.copyFile(baselayoutpath + layout, applayoutpath, (err)=>{
    if (err) throw err;
  })
})
