整合全网可用脚本, 失效脚本会及时修复, 过期脚本及时删除。

ql repo https://github.com/xp9477/jdScripts.git "jd_|gua_" "" "^jd[^_]|USER|ZooFaker_Necklace.js|JDJRValidator_Pure|sign_graphics_validate"


依赖安装：

docker exec -it 容器名 bash -c "apk add --no-cache build-base g++ cairo-dev pango-dev giflib-dev python3 zlib-dev gcc jpeg-dev python3-dev musl-dev freetype-dev && pip3 install requests && npm install -g pnpm && pnpm install -g ts-node @types/node typescript date-fns axios png-js canvas"

