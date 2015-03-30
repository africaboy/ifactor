#!/bin/sh

SCRDIR=`dirname $0`

. "$SCRDIR"/setenv.sh

cd "$SCRDIR/.."

rm -rf ./.gradle
gradle clean
