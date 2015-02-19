#!/bin/sh

bower install

target=vendor

rm -rf $target
mkdir $target

mkdir $target/foundation
cp -r bower_components/foundation/scss $target/foundation
cp -r bower_components/foundation/js $target/foundation

mkdir $target/fontawesome
cp -r bower_components/fontawesome/scss $target/fontawesome
cp -r bower_components/fontawesome/fonts $target/fontawesome/fonts
