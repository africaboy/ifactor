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
  <script src="../../../bootstrap/js/modal.js"></script>
  <script type="text/javascript">
    window.onload = function () {
      showdiv('invoice_details');

      $('#btn_accpet_offer_1').on('click', function () {

        $('#modal_accept_offer').modal('show');
      });

      $('#btn_accpet_offer_yes').on('click', function () {
        $('#modal_accept_offer').modal('hide');
        $('#model_accept_offer_confirmation').modal('show');
      });
    }

    function showdiv(divid) {
      $('#invoice_details').hide();
      $('#invoice_debtor').hide();
      $('#invoice_documents').hide();
      $('#invoice_offers').hide();
      $('#invoice_status').hide();
      $('#' + divid).show();
    }
  </script>
</c:set>

<c:set target="${self.content}" property="main">

              <div id="form-title">Invoices Details</div>
              <div id="form-main">
                <div>
                  <form class="form-horizontal" role="form">
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="col-sm-2">
                          <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_details');">Invoice</a>
                          <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_debtor');">Debtor</a>
                          <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_documents');">Documents</a>
                          <a class="btn btn-default btn-block" href="javascript:showdiv('invoice_status');">Status</a>
                        </div>
                        <div class="col-sm-10" id="invoice_details" style="display: none;">
                          <div class="form-group">
                            <div class="col-sm-10">
                              <h4>Invoice details</h4>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-6">
                              Invoice amount:
                            </div>
                            <div class="col-sm-4">
                              <input type="text" class="form-control input-sm" id="invoice_amout" readonly="true" value="100,000.00">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-6">
                              Desired minimum advance (%):
                            </div>
                            <div class="col-sm-4">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="desired_min_advance" value="40.00%">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-6">
                              Desired maximum interest (% per 30 days):
                            </div>
                            <div class="col-sm-4">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="desired_max_interest" value="12.00%">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-6">
                              Expected runing time (days):
                            </div>
                            <div class="col-sm-4">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="expected_runing_time" value="6">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-6">
                              Enable 'buy now':
                            </div>
                            <div class="col-sm-4">
                              <input type="checkbox" class="checkbox disabled" disabled="disabled" id="enable_buy_now" checked>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-10">
                              <h4>Buy now:</h4>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-6">
                              Advance that will be accepted directly (%):
                            </div>
                            <div class="col-sm-4">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="advance_buy_now" value="45.00%">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-6">
                              Interest that will be accepted directly (% per 30 days):
                            </div>
                            <div class="col-sm-4">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="interest_buy_now" value="8.00%">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Rating associated with the invoice *:
                            </div>
                            <div class="col-sm-5">
                              <a href="#" class="btn btn-default">1</a>
                              <a href="#" class="btn btn-default">2</a>
                              <a href="#" class="btn btn-default active">3</a>
                              <a href="#" class="btn btn-default">4</a>
                              <a href="#" class="btn btn-default">5</a>
                            </div>
                          </div>
                        </div>

                        <div class="col-sm-10" id="invoice_debtor" style="display: none;">
                          <div class="form-group">
                            <div class="col-sm-10">
                              <h4>Debtor details:</h4>
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Debtor name:
                            </div>
                            <div class="col-sm-5">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="debtor_name" value="12345">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Debtor KvK number:
                            </div>
                            <div class="col-sm-5">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="debtor_kvk_number" value="8.00%">
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Debtor is governmental:
                            </div>
                            <div class="col-sm-1">Yes:</div>
                            <div class="col-sm-1">

                              <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
                            </div>
                            <div class="col-sm-1">No:</div>
                            <div class="col-sm-1">
                              <input type="radio" class="radio disabled" disabled="disabled" />
                            </div>
                            <div class="col-sm-1"></div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Debtor is governmental:
                            </div>
                            <div class="col-sm-1">Yes:</div>
                            <div class="col-sm-1">

                              <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
                            </div>
                            <div class="col-sm-1">No:</div>
                            <div class="col-sm-1">
                              <input type="radio" class="radio disabled" disabled="disabled" />
                            </div>
                            <div class="col-sm-1"></div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Debtor is semi-governmental:
                            </div>
                            <div class="col-sm-1">Yes:</div>
                            <div class="col-sm-1">

                              <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
                            </div>
                            <div class="col-sm-1">No:</div>
                            <div class="col-sm-1">
                              <input type="radio" class="radio disabled" disabled="disabled" />
                            </div>
                            <div class="col-sm-1"></div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Debtor has accepted the invoice:
                            </div>
                            <div class="col-sm-1">Yes:</div>
                            <div class="col-sm-1">

                              <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
                            </div>
                            <div class="col-sm-1">No:</div>
                            <div class="col-sm-1">
                              <input type="radio" class="radio disabled" disabled="disabled" />
                            </div>
                            <div class="col-sm-1"></div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              Debtor has agreed to pay:
                            </div>
                            <div class="col-sm-1">Yes:</div>
                            <div class="col-sm-1">

                              <input type="radio" class="radio disabled" disabled="disabled" checked="checked" />
                            </div>
                            <div class="col-sm-1">No:</div>
                            <div class="col-sm-1">
                              <input type="radio" class="radio disabled" disabled="disabled" />
                            </div>
                            <div class="col-sm-1"></div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-5">
                              No of years that debtor is a client:
                            </div>
                            <div class="col-sm-5">
                              <input type="text" class="form-control input-sm disabled" readonly="true" id="Text1" value="123">
                            </div>
                          </div>
                        </div>
                        <div class="col-sm-10" id="invoice_documents">
                          <div class="form-group">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Description</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <c:if test="${page_state=='in-auction'}">
                        <div class="col-sm-10" id="invoice_offers">
                          <div class="form-group">
                            <table class="table table-bordered">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>Buyer name</th>
                                  <th>Offer advance(%)</th>
                                  <th>Offer interest(%)</th>
                                  <th>Offer made at</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <button type="button" class="btn btn-primary" id="btn_accpet_offer_1">Accept</button>
                                  </td>
                                  <td>TestBuyer</td>
                                  <td>32</td>
                                  <td>13</td>
                                  <td>6/15/2014 10:31 AM</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        </c:if>
                        <div class="col-sm-10" id="invoice_status">
                          <div class="form-group">
                            <div class="col-sm-3">Invoice state:</div>
                            <div class="col-sm-2">
                              <label class="label label-success">Submited</label>
                            </div>
                            <div class="col-sm-5"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
</c:set>
<c:set target="${self.content}" property="free">
  <!-- Modal -->
  <div class="modal fade" id="modal_accept_offer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="H1">Accept offer</h4>
        </div>
        <div class="modal-body">
          Are you sure you want to accept offer ?
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="btn_accpet_offer_yes">Yes</button>
          <button type="button" class="btn btn-primary" data-dismiss="modal">No</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->

  <!-- Modal -->
  <div class="modal fade" id="model_accept_offer_confirmation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          <h4 class="modal-title" id="H2">Confirmation</h4>
        </div>
        <div class="modal-body">
          The offer was accepted.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
        </div>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</c:set>

<%@ include file="/WEB-INF/views/themes/default/include/main.jsp"%>
<script type="text/javascript">
  window.onload = function () {
    showdiv('invoice_details');
  }
  
  function showdiv(divid) {
    $('#invoice_details').hide();
    $('#invoice_debtor').hide();
    $('#invoice_documents').hide();
    $('#invoice_status').hide();
    $('#' + divid).show();
  }
</script>
