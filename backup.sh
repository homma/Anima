#!/bin/sh

#BKDIR=${HOME}/Dropbox/Anima/History/`date '+%Y-%m%d-%H%M.%S'`
#export BKDIR
#cp -Rp . ${BKDIR}

git add .
git commit -a -m "auto commit"
git push origin master

git checkout gh-pages
git pull
git push origin gh-pages

