<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Tiêu đề: Hóa đơn được chấp nhận</b>
  </div>
  <div>
    Gửi Quý khách,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    Chúc mừng Quý khách. Hóa đơn ID <00000> đã hợp lệ và sẵn sàng cho đấu giá. Trong trương hợp chưa cung cấp hóa đơn gốc, xin vui lòng gửi hóa đơn gốc về địa chị dưới đây trong thời gian sớm nhất có thể để quy trình giải ngân được thực hiện.
  </div>
  <div>
    Chi tiết thông tin được hiển thị dưới đây<br/>
    Thông tin liên quan: <b>hóa đơn</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Thông tin về hóa đơn trên nền tảng: <br />
    •ID hóa đơn: ${apply.id} <br />
    •Giá trị hóa đơn: ${apply.finInvAmount} <br />
    •Giá bán ngay: ${apply.readyToSellAdv} <br />
    •Thời điểm tải hóa đơn: ${apply.updateTime?string('yyyy-MM-dd HH:mm:ss')} <br />
    •Thời điểm bắt đầu đấu giá: ${apply.startDate?string('yyyy-MM-dd HH:mm:ss')} <br />
    <a href="${base}/seller/invoice/under-approval/detail/${apply.id}">Tới thông tin hóa đơn </a> <br />
    Vui lòng gửi hóa đơn gốc đến: Trung tâm EntroAuction, 72 Trần Hưng Đạo, Hà Nội hoặc 81 Hàm Nghi, Q1 TPHCM (to be confirmed address once company is founded)
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