#!/bin/sh

DATE=`date '+%Y-%m%d-%H%M.%S'`

git checkout master
git add .
git commit -a -m "commit on ${DATE}."
git push origin master

git checkout gh-pages
git pull . master
git push origin gh-pages
git checkout master

