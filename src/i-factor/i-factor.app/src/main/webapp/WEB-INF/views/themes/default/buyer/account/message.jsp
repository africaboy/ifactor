<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">Message</c:set>
<c:set target="${self.css}" property="main">
<link rel="stylesheet" href="${base}/static/themes/default/css/regmsg.css?ver=${version.app}">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript">
    </script>
</c:set>

<c:set target="${self.content}" property="main">
              <!-- <div id="form-title">Message</div> -->
              <div id="form-main">
                <div class="msg-container" id="msg-container">
                  <div class="msg-main-container">
                    <div class="msg-main-div"> 
                      <div style="text-align: center; font-weight:bold;">
                      <c:if test="${succeed}">
                      Congratulation!
                      </c:if>
                      <c:if test="${not succeed}">
                      Sorry!
                      </c:if>
                      </div>
                      <div style="text-align:center; font-size:20px;">${message}</div>
                      <div style="text-align:center" id="timetips"></div>
                    </div>
                  </div>
                </div>
              </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
