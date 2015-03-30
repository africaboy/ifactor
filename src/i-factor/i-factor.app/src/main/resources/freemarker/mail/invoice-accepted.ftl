<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Title: Invoice ready for auction</b>
  </div>
  <div>
    Dear Client,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    Your invoice Invoice ID - <000000> has successfully passed the qualification process and it is ready for auction. In case you have not provided the original invoice, please kindly send the original invoice to the address below as soon as possible in order to initiate the disbursement.
  </div>
  <div>
    Here are the details of your <b>invoice</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Thông tin về hóa đơn trên nền tảng: <br/>
    •ID invoice: ${apply.id} <br />
    •Invoice value: ${apply.finInvAmount} <br/>
    •Ready to sell price: ${apply.readyToSellAdv} <br/>
    •Time to upload: ${apply.updateTime?string('yyyy-MM-dd HH:mm:ss')} <br/>
    •Time to start auction: ${apply.startDate?string('yyyy-MM-dd HH:mm:ss')} <br/>
    <a href="${base}/seller/invoice/under-approval/detail/${apply.id}">To your invoice </a><br/>
    Please kindly send the original invoice to: EntroAuction center, 72 Tran Hung Dao, Hanoi or 81 Hàm Nghi, Q1 TPHCM (to be confirmed address once company is founded) 
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
