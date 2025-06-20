##案例创建
cd src
yarn create nuxt web01
cd web01

##国内注意配置proxy
set all_proxy=http://127.0.0.1:10081

##配置站点（base中的通用配置：eslint，nuxtconfig, package.json，font, icon, base scss）
cd ../
yarn create-web web03 -eslint -config

#建议整体执行 如下：
cd src ; yarn create nuxt web03 ; cd ../ ; yarn create-web web01 -eslint -config ; cd src/web01
