#!/bin/sh

PRGDIR=`dirname $0`

. "$PRGDIR"/../setenv.sh

"$MYSQL_HOME/bin/mysql" $MYSQL_LOGON -f mysql < "$PRGDIR"/data/mysql.sql
"$MYSQL_HOME/bin/mysql" $MYSQL_LOGON ifactor < "$PRGDIR"/data/ifactor.sql
