#!/bin/sh

SCRDIR=`dirname $0`

. "$SCRDIR"/../../../setenv.sh

PATH=$JAVA_HOME/bin:$M2_HOME/bin:$GRADLE_HOME/bin:$PATH

export JAVA_HOME M2_HOME GRADLE_HOME ECLIPSE_HOME NEXUS_HOME MYSQL_HOME MYSQL_LOGON

$NEXUS_HOME/bin/nexus start
