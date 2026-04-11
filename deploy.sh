#!/usr/bin/env sh

set -e

cd app

yarn build

cd dist

cp index.html 404.html
echo "xlei.net" > CNAME

rm -rf .git
git init
git add -A
git commit -m "new deployment"
git push -f https://github.com/xinshuoLei/xinshuolei.github.io.git main:gh-pages

cd -
