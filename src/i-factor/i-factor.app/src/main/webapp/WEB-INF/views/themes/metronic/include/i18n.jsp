<%@ page contentType="text/html;charset=UTF-8" %>
<c:set target="${self}" property="i18n" value="<%= new java.util.HashMap()%>" />
<c:if test="${self.locale!='vi_VN'}">
  <c:set target="${self.i18n}" property="menu_text" value="text" />
  <c:set target="${self.i18n}" property="catalog_name" value="name" />
  <c:set target="${self.i18n}" property="question_qtext" value="qtext" />
  <c:set target="${self.i18n}" property="question_atext" value="atext" />
</c:if>
<c:if test="${self.locale=='vi_VN'}">
  <c:set target="${self.i18n}" property="menu_text" value="textViVn" />
  <c:set target="${self.i18n}" property="catalog_name" value="nameViVn" />
  <c:set target="${self.i18n}" property="question_qtext" value="qtextViVn" />
  <c:set target="${self.i18n}" property="question_atext" value="atextViVn" />
</c:if>