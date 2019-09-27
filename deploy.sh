# deploy.sh
# 错误时停止
set -e
# 打包
npm run build
# 进入目标文件夹
cd dist

# 提交到本地仓库
git init
git config user.name "GitHub Actions"
git config user.email "478222961@qq.com"
git add -A
git commit -m "deploy"
git push -f git@github.com:kirahan/CubeResultDisplayTools.git master:gh-pages

cd ..