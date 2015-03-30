#!/bin/sh

SCRDIR=`dirname $0`

. "$SCRDIR"/../../scripts/setenv.sh

GRADLE_OPTS="-Xmx512m -XX:MaxPermSize=512m -Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n"
#GRADLE_USER_HOME=~/.gradle

cd "$SCRDIR/.."
export GRADLE_OPTS GRADLE_USER_HOME
gradle jettyRun
