# 1. 开发入门

- 官方下载并安装Mysql5.5+、jdk1.6、Tomcat7+、eclipse4.2+、gradle1.8+、nexus2.1+
- 执行nexus-<版本>/bin/jsw/windows-操作系统版本/console-nexus.bat启动私服
- 编辑etc/setenv相关软件路径指向本地安装/下载的版本
- 启动Mysql数据库后执行src/i-factor/scripts/dbini初始化数据库
- 执行src/i-factor/scripts/init初始化环境并自动创建eclipse项目，首次运行要从外网下载依赖的jar，所以较慢，如果没报错请等待，如果报错请选择网络好的环境执行
- 执行src/i-factor/scripts/eclipse启动eclipse，切换到java视图，eclipse中浏览或编辑代码
- 执行src/i-factor/src/i-factor.mgt/scripts/gradle-jettyRun启动管理平台，浏览器访问http://localhost:8080，使用admin/888888登录
- 执行src/i-factor/src/i-factor.app/scripts/gradle-jettyRun启动交易平台，浏览器访问http://localhost:9080，使用admin/888888登录
- 查看代码结构及各部分原理

# 3. 参考资料
- [Gradle](http://www.gradle.org/)
- [Nexus](http://www.sonatype.org/nexus/)
- [Eclipse](http://download.eclipse.org/eclipse/downloads/drops4/R-4.3.2-201402211700/)
- [Jetty](http://www.gradle.org/docs/current/userguide/userguide_single.html#jetty_plugin)
- [Groovy](http://groovy.codehaus.org/)
- [Spring Data JPA](https://www.ibm.com/developerworks/cn/opensource/os-cn-spring-jpa/)
- [Apache Shiro](https://www.ibm.com/developerworks/cn/java/j-lo-shiro/)
