import { Button, Input, notification } from "antd";
import React, { useState } from "react";
import axiosClient from "../../apis/axiosClient";
import "./contact.css";

const { TextArea } = Input;

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/contacts", formData);
      notification.success({
        message: "Success",
        description: "Contact created successfully",
      });
      setFormData({
        full_name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to create contact",
      });
    }
  };
  
  return (
    <div id="container" class="pt-5">
      <div
        id="carouselMultiItemExample"
        class="carousel slide carousel-dark text-center"
        data-mdb-ride="carousel"
      >
        <div class="carousel-inner py-4">
          <div class="carousel-item active">
            <div class="container">
              <div class="row">
                <div class="col-lg-4">
                  <img
                    class="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
                    alt="avatar"
                  />
                  <h5 class="mb-3">Anna Deynah</h5>
                  <p>UX Designer</p>
                  <p class="text-muted">
                    <i class="fas fa-quote-left pe-2"></i>
                    Đằng sau thành công của một con người không thể thiếu một
                    cuốn sách gối đầu. Sách là kho báu tri thức của cả nhân
                    loại, là kết tinh trí tuệ qua bao thế hệ con người. Một cuốn
                    sách hay chính là chìa khóa quan trọng để mỗi con người có
                    thể chinh phục mọi khó khăn và chạm đến thành công
                  </p>
                  <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-4 d-none d-lg-block">
                  <img
                    class="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                    alt="avatar"
                  />
                  <h5 class="mb-3">John Doe</h5>
                  <p>Web Developer</p>
                  <p class="text-muted">
                    <i class="fas fa-quote-left pe-2"></i>
                    Sách không chỉ là kho tàng kiến thức mà còn là phép màu kỳ
                    diệu với tâm hồn mỗi người. Đọc sách cũng là một phương pháp
                    thư giãn tinh thần và giải tỏa stress hiệu quả. Khi bạn đắm
                    chìm vào những câu từ xinh đẹp, mọi mệt mỏi dường như tan
                    biến.
                  </p>
                  <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star-half-alt fa-sm"></i>
                    </li>
                  </ul>
                </div>

                <div class="col-lg-4 d-none d-lg-block">
                  <img
                    class="rounded-circle shadow-1-strong mb-4"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                    alt="avatar"
                  />
                  <h5 class="mb-3">Maria Kate</h5>
                  <p>Photographer</p>
                  <p class="text-muted">
                    <i class="fas fa-quote-left pe-2"></i>
                    Để ra đời một cuốn sách hay, tác giả phải chọn lọc và sử
                    dụng những câu từ chất lượng nhất, vừa có thể chạm đến người
                    đọc, vừa thể hiện được nghệ thuật của sáng tạo và viết lách.
                    Người đọc có thể tiếp cận được những ngôn từ hay và đẹp
                    nhất, sau đó tiếp thu chúng nhờ quá trình tư duy của não bộ.
                  </p>
                  <ul class="list-unstyled d-flex justify-content-center text-warning mb-0">
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="fas fa-star fa-sm"></i>
                    </li>
                    <li>
                      <i class="far fa-star fa-sm"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container pb-5">
        <section class="text-center">
          <h3 class="mb-5">Liên hệ</h3>
          <div class="row">
            <div class="col-lg-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.57348593182!2d-74.00599512526003!3d40.72586666928451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f988156a9%3A0xd54629bdf9d61d68!2sBroadway-Lafayette%20St!5e0!3m2!1spl!2spl!4v1624523797308!5m2!1spl!2spl"
                class="h-100 w-100"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div class="col-lg-7">
            <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <Input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Họ tên"
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Địa chỉ email"
                    />
                  </div>
                  <div className="col-md-12 mb-4">
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Chủ đề"
                    />
                  </div>
                  <div className="col-md-12 mb-4">
                    <TextArea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Nội dung"
                    />
                  </div>
                  <div className="col-md-12">
                    <Button type="primary" htmlType="submit">
                      Hoàn thành
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
