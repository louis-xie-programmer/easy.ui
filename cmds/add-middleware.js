const fs = require('fs');

if (process.length < 3) {
  throw error("argv is null or error")
}

const middlewarename = process.argv[2];

//中间件拷贝
const basemiddlewarepath = '../../packages/middleware/'
const appmiddlewarepath = 'middleware/'

if (!fs.existsSync(appcomponentpath)) {
  fs.mkdirSync(appmiddlewarepath, {recursive: true})
}

fs.copyFile(basemiddlewarepath + middlewarename, appmiddlewarepath, (err)=>{
  if (err) throw err;
})
