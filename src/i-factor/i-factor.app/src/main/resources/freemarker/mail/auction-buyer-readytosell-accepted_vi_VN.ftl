<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Tiêu đề: Giá bán ngay được chấp nhận</b>
  </div>
  <div>
    Gửi Quý khách,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    Quý khách đã đấu giá thành công hóa đơn ID <0000> tại giá bán ngay. Xin vui lòng cung cấp chữ ký điện tử hoặc tới chi nhánh gần nhất để ký hợp đồng con. Giải ngân sẽ được hoàn tất trong vòng xx ngày kể từ ngày hợp đồng con được ký và hóa đơn gốc được xác thực. Hướng dẫn chi tiết sử dụng chữ ký điện tử và thủ tục ký hợp đồng con xin vui lòng tham khảo thông tin tại đường link bên dưới.
  </div>
  <div>
    Chi tiết thông tin được hiển thị dưới đây<br/>
    Thông tin liên quan: <b>hóa đơn</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Chi tiết giao dịch: <br/>
    ID giao dịch: ${auction.id}  <br/>
    ID hóa đơn: ${auction.invoice.id} <br/>
    Tỷ lệ tài trợ: ${auction.discount}% <br/>
    Lãi suất: ${auction.interest}% <br/>
    Thời điểm tải hóa đơn: ${auction.invoice.uploadTime} <br/>
    Thời điểm bắt đầu đấu giá: ${auction.readyTime} <br/>
    Thời điểm đấu giá thành công: ${auction.dealTime} <br/>
    <a href="/buyer/openauction/openDetail/${auction.id}">Tới chi tiết thông tin hóa đơn <br/>
    <a href="/buyer/openauction/openDetail/${auction.id}">Hướng dẫn chi tiết sử dụng chữ ký điện tử và thủ tục ký hợp đồng con </a><br/>
    Địa chỉ gửi hóa đơn: Trung tâm EntroAuction, 72 Trần Hưng Đạo, Hà Nội,  hoặc 81 Hàm Nghi, Q1 TPHCM (to be confirmed address once company is founded)
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