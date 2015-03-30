<div style="background:#ccc;padding:10px;">
  <div id="ftl-content-logo">
    <img src="${base}/static/themes/default/img/logo1.png" />
    <img src="${base}/static/themes/default/img/logo2.png" />
  </div>
  <div style="background:#fff;">
    <!--Title -->
    <b>Tiêu đề: Xác nhận đăng ký tài khoản </b>
  </div>
  <div>
    Gửi Quý khách,
  </div>
  <div style="background:#fff">
    <!--Content field 1: General notification input here-->
    Cám ơn Quý khách đã đăng ký thông tin trên nền tảng EntroAuction. Xin Quý khách vui lòng kích hoạt tài khoản theo đường link ở dưới và làm theo hướng dẫn để hoàn tất quá trình đăng kí. 
  </div>
  <div>
    Chi tiết thông tin được hiển thị dưới đây<br/>
    Thông tin liên quan: <b>ứng dụng</b>
  </div>
  <div style="background:#fff;">
    <!--Content field 2: Details, Links and Actions input here-->
    Thông tin tài khoản: <br/>
    Username: ${user.loginName} <br/>
    Password: ${user.plainPassword} <br/>
    <a href="${base}/${role}/register/active/${user.loginName}/${user.mailActiveCode}">Kích hoạt tài khoản </a>
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