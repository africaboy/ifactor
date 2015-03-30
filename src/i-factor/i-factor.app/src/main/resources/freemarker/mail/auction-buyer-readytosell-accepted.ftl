<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Title: Ready to Sell price Accepted</b>
  </div>
  <div>
    Dear Client,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    You have successfully auctioned  Invoice - ID <000000> at ready-to-sell price.  Please kindly provide e-signature or go to the nearest Bank/The Bank branch to sign the sub-contract. Disbursement will be performed within xx days  from that date that the sub-contract is signed by all the parties and the original invoice is veriifed. For the detailed guidelines of using e-signature and sub-contract signing procedure, please kindly refer to the link below.
  </div>
  <div>
    Here are the details of your <b>auction</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Deal information: <br/>
    Transaction ID: ${auction.id} <br/>
    Invoice ID: ${auction.invoice.id} <br/>
    Financing rate: ${auction.discount}% <br/>
    Interest rate: ${auction.interest}% <br/>
    Invoice upload time: ${auction.invoice.uploadTime} <br/>
    Invoice ready-for-auction time: ${auction.readyTime} <br/>
    Deal time: ${auction.dealTime} <br/>
    <a href="/buyer/openauction/openDetail/${auction.id}">To the Invoice detailed information </a> <br/>
    <a href="/buyer/openauction/openDetail/${item.id}"Detailed guidelines of using e-signature and sub-contract signing procedures </a> <br/>
    Address to send the original invoice: EntroAuction center, 72 Tran Hung Dao, Hanoi or 81 Hàm Nghi, Q1 TPHCM (to be confirmed address once company is founded)
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
