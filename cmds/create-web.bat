@echo on
chcp 65001
rem 拉取packages中的base使其保持最新
:: cd packages/base
:: git clone https://github.com/louis-xie-programmer/easy.ui.base.git
set app-name=%1
set app-path=.\src\%1\
set base-path=.\packages\base\

rem 更新eslint.config.mjs
if "%2"=="eslint" (copy %base-path%eslint.config.mjs %app-path%  /Y)

rem 更新nuxt.config.ts
if "%3"=="config" (copy %base-path%nuxt.config.ts %app-path% /Y)

rem 更新package.json中的scripts
powershell -NoProfile -ExecutionPolicy Bypass -Command "$packagejson = Get-Content -Raw -Path '%app-path%package.json' | ConvertFrom-Json; $packagebasejson = Get-Content -Raw -Path '%base-path%package.json' | ConvertFrom-Json; $packagejson.scripts = $packagebasejson.scripts;$packagejson | ConvertTo-Json | Set-Content -Encoding UTF8 -Path '%app-path%package.json'"
