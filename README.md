# 概述
一套最贴近实用，追求最佳性能，结合微服务架构，同时全面顾及团队开发效率，解决前端项目管理中最棘手的问题
本套系统适合又SEO需求的大中型网站，或者要求极致性能的小型网站
##项目已完成的问题：
1. 实现公共项目及组件中间件等创建子项目，解决统一性；
2. 实现主项目反向代理测试各级网站；
3. 实现子项目中添加组件及中间件的添加；

##项目近期待实现功能：
1. 开发环境，测试环境，正式环境配置自适应；
2. SSR网页极致压缩全面减少js代码量；
3. SSR定期纯html静态页面化；
4. 在线PM2可视化部署，并实现无痕发布
5. cloudflare无服务器配置实现

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
