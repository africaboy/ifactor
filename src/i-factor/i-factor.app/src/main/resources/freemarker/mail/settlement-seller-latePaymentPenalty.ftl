<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Title: Late payment penalty </b>
  </div>
  <div>
    Dear Client,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    Sorry. Your payment of Invoice - ID <000000> has been late for xx days. You will be charged late payment penalty and interest earning according to sub-contract with Bank/The Bank. Please visit website EntroAuction for more detail
  </div>
  <div>
    Here are the details of your <b>auction</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Invoice details:
    - Invoice ID: ${auction.invoice.id}
    - Debtor: ${auction.invoice.debtorName}
    - Invoice amount: ${auction.invoice.finInvAmount}
    - Due date: ${auction.invoice.finDueDateAccToCont}
    <a href="${base}/seller/invoice/in-auction/detail/${auction.invoice.id}">For more detail, click here </a>
  </div>
  <div>
    Should you need assistance, please refer to our Help menu or email us at cs@EntroAuction
    <br/><br/>
    Best regards,<br/>
    The EntroAuction team
  </div>
  <div style="font-size:10px;">
    This is an auto-generated response, please do not reply to this email address.
  </div>
  <div style="color:#f00;font-size:10px;">
    Need input/template from Legal<br/>
    This message (including any attachments) is confidential and may be legally privileged. If you are not the intended recipient, you should not disclose, copy or use any part of it - please delete all copies immediately and notify EntroAuction Customer Service at cs@EntroAuction.vpb.com.vn<br/><br/>
    For further information on the services visit our web site at www.
  </div>
</div>
