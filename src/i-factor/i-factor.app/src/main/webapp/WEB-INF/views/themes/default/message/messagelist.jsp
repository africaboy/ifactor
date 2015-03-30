<%@ page contentType="text/html;charset=UTF-8" %>
<%--
# Seller
--%>
<%@ include file="/WEB-INF/views/include/global.jsp"%>
<c:set target="${self}" property="title">i-Factor</c:set>
<c:set target="${self.css}" property="main">
    <style type="text/css">
    </style>
</c:set>
<c:set target="${self.js}" property="main">
    <script type="text/javascript" src="${base}/static/libs/iCheck-master/icheck.min.js"></script>
    <script type="text/javascript" src="${base}/static/themes/default/js/message/message.js"></script>
    <script type="text/javascript">
    $(function () {
      //$('.selectpicker').selectpicker();
      $('.dropmenu').dropdown('toggle');
    });
   </script>
</c:set>
<c:set target="${self.content}" property="main">
                <div id="form-div">
                <div id="form-title">Open Auction</div>
                <div id="form-main">
		          <div>
		            <form class="form-horizontal" action="${base}/message/messageList"  name="formQuery"  id="formQuery" method="post" role="form">
	                  <div class="row">
	                    <div class="col-sm-12">
                          <div class="col-sm-3">
                            <label class="control-label" for="inputSuccess">Create time:</label>
                          </div>
                          <div class="col-sm-2">
                            <input type="date" class="form-control input-sm" id="createTimeFrom"  name="createTimeFrom" placeholder="">
                          </div>
                          <div class="col-sm-1">
                            <label class="control-label" for="inputSuccess">-</label>
                          </div>
                          <div class="col-sm-2">
                            <input type="date" class="form-control input-sm" id="createTimeTo"  name="createTimeTo"  placeholder="">
                          </div>
                          <div class="col-sm-1">
                            <button type="submit" class="btn btn-default">Query</button>
                          </div>
	                    </div>
	                  </div>
	                    
                      <div class="row">
                        <div class="col-sm-12">
                          <table class="table table-bordered">
                            <thead>
                              <tr>
                                <th>No.</th>
                                <th>MessageId</th>
                                <th>Title</th>
                                <th>Create Time</th>
                                <th>Update Time</th>
                                <th>content</th>
                                 <th></th>
                              </tr>
                            </thead>
                            <tbody>
                            <c:if test="${not empty page.content}">
                             <c:forEach var="item" items="${page.content}" varStatus="status">  
                              <tr>
                                <td>${status.index + 1}</td>  
	                            <td>${item.id }</td>
	                            <td>${item.title}</td>
	                            <td>${item.createTime }</td>
	                            <td>${item.updateTime }</td>
	                            <td>${item.content}</td>
	                             <td>
	                              <a href="/message/delete/${item.id}" class="btn btn-primary" target="main-iframe">Delete</a>
	                              <!-- <button type="button" class="btn btn-primary" id="invoice_detail_1">Detail</button>-->
	                            </td>
                              </tr>
                            </c:forEach>
                          </c:if>
                         </tbody>
                         <tfoot>
                           <tr>
                             <td colspan="10">
                               <input type="hidden"  name="pageNumber" value="${page.number}" />
                               <input type="hidden"  name="pageSize"   value="${page.size}" />
                               <%@ include file="/WEB-INF/views/themes/metronic/include/pagination.jsp"%>
                             </td>
                           </tr>
                         </tfoot>
                       </table>
                      </div>
                      </div>
	                </form>
		          </div>
		        </div>
	          </div>
</c:set>
<c:set target="${self.content}" property="free">
</c:set>
<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
