#!/bin/sh

SCRDIR=`dirname $0`

. "$SCRDIR"/../../scripts/setenv.sh

cd "$SCRDIR/.."
gradle clean cleanEclipse eclipse
