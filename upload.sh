#!/bin/sh

DATE=`date '+%Y/%m/%d %H:%M'`
MESSAGE="committed on ${DATE}."

if [ $# -eq 1 ]; then MESSAGE=$1; fi

git checkout master
git add .
git commit -a -m "${MESSAGE}"
git push origin master

git checkout gh-pages
git pull . master
git push origin gh-pages
git checkout master

