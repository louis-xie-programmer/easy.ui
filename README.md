# 概述
大中型网站既的前端既要实现SEO, 同时又要保持性能最佳，同时团队开发协作在一个项目里网站由于各种配置不当协同效率很低，这一套前端框架将带一起来解决

##子项目创建
cd src
yarn create nuxt web01
cd web01

##国内注意配置proxy
set all_proxy=http://127.0.0.1:10081

##配置站点（base中的通用配置：eslint，nuxtconfig, package.json，font, icon, base scss）
cd ../
yarn create-web web03 -eslint -config

##建议整体执行 如下：
cd src ; yarn create nuxt web03 ; cd ../ ; yarn create-web web01 -eslint -config ; cd src/web01

##在主项目根路径安装
cd ../../
yarn add express http-proxy-middleware

##运行主项目进行整合测试
yarn run-mapp