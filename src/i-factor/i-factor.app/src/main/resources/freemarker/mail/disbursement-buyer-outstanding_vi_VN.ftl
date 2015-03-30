<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Tiêu đề: Thông báo chuyển tiền</b>
  </div>
  <div>
    Gửi Quý khách,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    Hóa đơn mã số <000000> được đấu giá thành công. Theo thông báo của Bank/The Bank, số dư khả dụng trong tài khoản của quý khách hiện không đủ tiền để hoàn tất giao dịch, xin vui lòng chuyển số tiền còn thiếu vào tài khoản của quý khách tại Bank/The Bank trong vòng 2 ngày để hoàn tất việc thanh toán. 
  </div>
  <div>
    Chi tiết thông tin được hiển thị dưới đây<br/>
    Thông tin liên quan: <b>ứng dụng</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Chi tiết giao dịch: <br/>
    ID giao dịch: ${auction.id} <br/>
    ID hóa đơn: ${auction.invoice.id} <br/>
    Giá trị khớp: xxx <br/>
    Giá trị phải thanh toán: xxx <br/>
    Hạn thanh toán: T+2 <br/>
    Thông tin tài khoản: Account no. abcxyz <br/>
    Ngân hàng: Bank/The Bank <br/>
    <a href="${base}/buyer/closedauction/closedAuctionDetail/${auction.invoice.id}">Thông tin chi tiết của hóa đơn tại </a><br/>
  </div>
  <div>
    Nếu Quý khách có bất kỳ thắc mắc nào, vui lòng tham khảo mục Trợ Giúp hay liên hệ với chúng tôi theo địa chỉ email cs@EntroAuction
    <br/><br/>
    Trân trọng,<br/>
    Nhóm EntroAuction
  </div>
  <div style="font-size:10px;">
    Đây là email tự động, xin vùi lòng không trả lời địa chỉ email này.
  </div>
  <div style="color:#f00;font-size:10px;">
    Cần tư vấn/mẫu của Pháp Chế<br/>
    This message (including any attachments) is confidential and may be legally privileged. If you are not the intended recipient, you should not disclose, copy or use any part of it - please delete all copies immediately and notify EntroAuction Customer Service at cs@EntroAuction.vpb.com.vn<br/><br/>
    For further information on the services visit our web site at www.
  </div>
</div>