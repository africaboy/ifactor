<%@ page contentType="text/html;charset=UTF-8" %><!doctype html>
<!--[if lt IE 7]> <html class="ie6 oldie"> <![endif]-->
<!--[if IE 7]>    <html class="ie7 oldie"> <![endif]-->
<!--[if IE 8]>    <html class="ie8 oldie"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="">
<!--<![endif]-->
  <head>
    <meta charset="UTF-8">
    <title>${self.title}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${base}/static/libs/bootstrap/${version.bootstrap}/css/bootstrap.min.css">
    <link rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/font-awesome.min.css">
    <link rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/ionicons.min.css">
    <c:if test="${not empty self.css.plugins}">
    <!-- 当前页面插件样式 -->
    ${self.css.plugins}
    </c:if>
    <link rel="stylesheet" href="${base}/static/libs/AdminLTE/${version.AdminLTE}/css/AdminLTE.css">
    <link rel="stylesheet" href="${base}/static/themes/default/css/app.css?ver=${version.app}">
    <c:if test="${not empty self.css.main}">
    <!-- 当前页面样式 -->
    ${self.css.main}
    </c:if>
    <!--[if lt IE 9]>
    <script src="${base}/static/libs/html5shiv/${version.html5shiv}/html5shiv.js"></script>
    <script src="${base}/static/libs/respondjs/${version.respondjs}/respond.min.js"></script>
    <![endif]-->
  </head>
  <body class="skin-blue">
    <header class="header">
      <a href="${base}/static/libs/AdminLTE/${version.AdminLTE}/index.html" class="logo">AdminLTE</a>
      <nav class="navbar navbar-static-top" role="navigation">
        <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </a>
        <div class="navbar-right">
          <ul class="nav navbar-nav">
            <li class="dropdown messages-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope"></i>
                <span class="label label-success">4</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 4 messages</li>
                <li>
                  <ul class="menu">
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="${base}/static/libs/AdminLTE/${version.AdminLTE}/img/avatar3.png" class="img-circle" alt="User Image"/>
                        </div>
                        <h4>Support Team<small><i class="fa fa-clock-o"></i> 5 mins</small></h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="${base}/static/libs/AdminLTE/${version.AdminLTE}/img/avatar2.png" class="img-circle" alt="user image"/>
                        </div>
                        <h4>AdminLTE Design Team<small><i class="fa fa-clock-o"></i> 2 hours</small></h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="${base}/static/libs/AdminLTE/${version.AdminLTE}/img/avatar.png" class="img-circle" alt="user image"/>
                        </div>
                        <h4>Developers<small><i class="fa fa-clock-o"></i> Today</small></h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="${base}/static/libs/AdminLTE/${version.AdminLTE}/img/avatar2.png" class="img-circle" alt="user image"/>
                        </div>
                        <h4>Sales Department<small><i class="fa fa-clock-o"></i> Yesterday</small></h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <div class="pull-left">
                          <img src="${base}/static/libs/AdminLTE/${version.AdminLTE}/img/avatar.png" class="img-circle" alt="user image"/>
                        </div>
                        <h4>Reviewers<small><i class="fa fa-clock-o"></i> 2 days</small></h4>
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="footer"><a href="#">See All Messages</a></li>
              </ul>
            </li>
            <li class="dropdown notifications-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-warning"></i>
                <span class="label label-warning">10</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 10 notifications</li>
                <li>
                  <ul class="menu">
                    <li>
                      <a href="#"><i class="ion ion-ios7-people info"></i> 5 new members joined today</a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-warning danger"></i> Very long description here that may not fit into the page and may cause design problems</a>
                    </li>
                    <li>
                      <a href="#"><i class="fa fa-users warning"></i> 5 new members joined</a>
                    </li>
                    <li>
                      <a href="#"><i class="ion ion-ios7-cart success"></i> 25 sales made</a>
                    </li>
                    <li>
                      <a href="#"><i class="ion ion-ios7-person danger"></i> You changed your username</a>
                    </li>
                  </ul>
                </li>
                <li class="footer"><a href="#">View all</a></li>
              </ul>
            </li>
            <li class="dropdown tasks-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-tasks"></i>
                <span class="label label-danger">9</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 9 tasks</li>
                <li>
                  <ul class="menu">
                    <li>
                      <a href="#">
                        <h3>Design some buttons<small class="pull-right">20%</small></h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">20% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>Create a nice theme<small class="pull-right">40%</small></h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-green" style="width: 40%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">40% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>Some task I need to do<small class="pull-right">60%</small></h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-red" style="width: 60%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">60% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <h3>Make beautiful transitions<small class="pull-right">80%</small></h3>
                        <div class="progress xs">
                          <div class="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">80% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="footer">
                  <a href="#">View all tasks</a>
                </li>
              </ul>
            </li>
            <li class="dropdown user user-menu">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="glyphicon glyphicon-user"></i>
                <span>${loginUser.loginName} <i class="caret"></i></span>
              </a>
              <ul class="dropdown-menu">
                <li class="user-header bg-light-blue">
                  <img src="${base}/static/libs/AdminLTE/${version.AdminLTE}/img/avatar3.png" class="img-circle" alt="User Image">
                  <p>${loginUser.loginName}<small>Member since Nov. 2012</small></p>
                </li>
                <li class="user-body">
                  <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                  </div>
                  <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                  </div>
                </li>
                <li class="user-footer">
                  <div class="pull-left">
                    <a href="#" class="btn btn-default btn-flat">Profile</a>
                  </div>
                  <div class="pull-right">
                    <a href="#" class="btn btn-default btn-flat">Sign out</a>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="wrapper row-offcanvas row-offcanvas-left">
      <aside class="left-side sidebar-offcanvas">
        <section class="sidebar">
          <div class="user-panel">
            <div class="pull-left image">
              <img src="${base}/static/libs/AdminLTE/${version.AdminLTE}/img/avatar3.png" class="img-circle" alt="User Image">
            </div>
            <div class="pull-left info">
              <p>Hello, ${loginUser.loginName}</p>
              <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
              <input type="text" name="q" class="form-control" placeholder="Search..."/>
              <span class="input-group-btn">
                <button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
            </div>
          </form>
          <ul class="sidebar-menu">
            <!-- 树形菜单 -->
<c:forEach var="menu" items="${menus}">
  <c:set target="${self.nav}" property="menu" value="${menu}" />
  <%@ include file="/WEB-INF/views/themes/default/include/menu.jsp"%>
</c:forEach>
          </ul>
        </section>
      </aside>
      <aside class="right-side">
<c:if test="${not empty self.content.header}">
        <section class="content-header">
          <!-- 当前页面内容头 -->
          ${self.content.header}
        </section>
</c:if>
<c:if test="${not empty self.content.main}">
        <section class="content">
          <!-- 当前页面内容体 -->
          ${self.content.main}
        </section>
</c:if>
      </aside>
    </div>

    ${self.content.free}

    <script src="${base}/static/libs/jquery/${version.jquery}/jquery.min.js"></script>
    <script src="${base}/static/libs/bootstrap/${version.bootstrap}/js/bootstrap.min.js"></script>
    <script src="${base}/static/libs/AdminLTE/${version.AdminLTE}/js/AdminLTE/app.js"></script>
    <c:if test="${not empty self.js.plugins}">
    <!-- 当前页面插件js -->
    ${self.js.plugins}
    </c:if>
    <script>
    var app = {
      base: '${base}', 
      version: '${version.app}', 
      loginName: '${loginUser.loginName}'
    };
    </script>
    <script src="${base}/static/themes/default/js/app.js?ver=${version.app}"></script>
    <c:if test="${not empty self.js.main}">
    <!-- 当前页面js -->
    ${self.js.main}
    </c:if>
  </body>
</html>