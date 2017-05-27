#!/bin/bash

# only proceed script when started not by pull request (PR)
if [ $TRAVIS_PULL_REQUEST == "true" ]; then
  echo "this is PR, exiting"
  exit 0
fi

# enable error reporting to the console
set -e

# build site with jekyll, by default to `_site' folder
jekyll build

# cleanup
rm -rf ../11route.com.gh-pages

#clone `master' branch of the repository using encrypted GH_TOKEN for authentification
git clone https://${GH_TOKEN}@github.com/ayastreb/11route.git ../11route.com.gh-pages

# copy generated HTML site to `master' branch
cp -R _site/* ../11route.com.gh-pages

# commit and push generated content to `gh-pages' branch
cd ../11route.com.gh-pages
git checkout gh-pages
git config user.email "anatoliy.yastreb@gmail.com"
git config user.name "Anatoliy Yastreb"
git add -A .
git commit -a -m "Travis #$TRAVIS_BUILD_NUMBER"
git push --quiet origin master > /dev/null 2>&1