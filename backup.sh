#!/bin/sh

#BKDIR=${HOME}/Dropbox/Anima/History/`date '+%Y-%m%d-%H%M.%S'`
#export BKDIR
#cp -Rp . ${BKDIR}

git add .
git commit -a
git push origin master
