<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Title: Reminding 1 days remaining</b>
  </div>
  <div>
    Dear Client,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    Your Invoice - ID <000000>'s remaining day before due date is 1 working days. Please contact with your debtor to pay for the invoice before due date.   
  </div>
  <div>
    Here are the details of your <b>auction</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Invoice details: <br/>
    - ID transaction: ${auction.id} <br/>
    - ID invoice: ${auction.invoice.id} <br/>
    - Debtor: (Make sure we allow for debtor info input in the 1st place for auto generation) <br/>
    - Time to upload: <br/>
    - Invoice maturity date: <br/>
    - Expected payment date: <br/>
    <a href="${base}/seller/invoice/in-auction/detail/${auction.invoice.id}">Invoice status</a><br/>
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
