import Texty from "rc-texty";
import React, { useEffect, useRef, useState } from "react";
import eventApi from "../../apis/eventApi";
import productApi from "../../apis/productApi";
import triangleTopRight from "../../assets/icon/Triangle-Top-Right.svg";
import "../Home/home.css";

import {
  BackTop,
  Carousel,
  Col,
  Row,
  Spin
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { useHistory } from "react-router-dom";
import { numberWithCommas } from "../../utils/common";

const Home = () => {
  const [event, setEvent] = useState([]);
  const [productList, setProductList] = useState([]);
  const [eventListHome, setEventListHome] = useState([]);
  const [totalEvent, setTotalEvent] = useState(Number);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [productsPhone, setProductsPhone] = useState([]);
  const [productsPC, setProductsPC] = useState([]);
  const [productsTablet, setProductsTablet] = useState([]);
  const [visible, setVisible] = useState(true);
  const tawkMessengerRef = useRef();
  const initialCountdownDate = new Date().getTime() + 24 * 60 * 60 * 1000;
  const [countdownDate, setCountdownDate] = useState(
    localStorage.getItem("countdownDate") || initialCountdownDate
  );

  const [timeLeft, setTimeLeft] = useState(
    countdownDate - new Date().getTime()
  );

  const history = useHistory();

  const handlePage = async (page, size) => {
    try {
      const response = await eventApi.getListEvents(page, 8);
      setEventListHome(response.data);
      setTotalEvent(response.total_count);
      setCurrentPage(page);
    } catch (error) {
      console.log("Failed to fetch event list:" + error);
    }
  };

  const handleReadMore = (id) => {
    console.log(id);
    history.push("product-detail/" + id);
  };

  const handleCategoryDetails = (id) => {
    console.log(id);
    history.push("product-list/" + id);
  };

  const onLoad = () => {
    setVisible(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getListProducts({
          page: 1,
          limit: 10,
        });
        setProductList(response.data.docs);
        setTotalEvent(response);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }

      try {
        const response = await productApi.getListEvents(1, 6);
        setEventListHome(response.data);
        setTotalEvent(response.total_count);
      } catch (error) {
        console.log("Failed to fetch event list:" + error);
      }
      try {
        const response = await productApi.getCategory({ limit: 10, page: 1 });
        console.log(response);
        setCategories(response.data.docs);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = { limit: 10, page: 1 };

        // Lấy dữ liệu từ API và lọc các sản phẩm có trạng thái "available"
        const response = await productApi.getProductsByCategory(
          data,
          "65fd67f2207e1639f49dc016"
        );
        console.log(response);
        setProductsPhone(response.data.docs);

        const response2 = await productApi.getProductsByCategory(
          data,
          "65fd67c2207e1639f49dc012"
        );
        console.log(response2);
        setProductsPC(response2.data.docs);

        const response3 = await productApi.getProductsByCategory(
          data,
          "65fd6755207e1639f49dbfe4"
        );
        console.log(response3);
        setProductsTablet(response3.data.docs);

      } catch (error) {
        console.log(error);
      }

      localStorage.setItem("countdownDate", countdownDate);

      const interval = setInterval(() => {
        const newTimeLeft = countdownDate - new Date().getTime();
        setTimeLeft(newTimeLeft);

        if (newTimeLeft <= 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    })();
  }, [countdownDate]);

  return (
    <Spin spinning={false}>
      <div
        style={{
          background: "#FFFFFF",
          overflowX: "hidden",
          overflowY: "hidden",
          paddingTop: 15,
        }}
        className="home"
      >
        <div
          style={{ background: "#FFFFFF" }}
          className="container-banner banner-promotion"
        >
          <Row justify="center" align="top" key="1">
            <Col span={4}>
              <ul className="menu-tree">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => handleCategoryDetails(category._id)}
                  >
                    <div className="menu-category">
                      {category.name}
                      {/* <RightOutlined /> */}
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
            <Col span={15}>
              <Carousel autoplay className="carousel-image">

                <div className="img">
                  <img
                    style={{ width: "100%" }}
                    src="https://nhasachphuongnam.com/images/promo/276/Banners-Balo-Yome-890x396.jpg"
                    alt=""
                  />
                </div>
                <div className="img">
                  <img
                    style={{ width: "100%" }}
                    src="https://nhasachphuongnam.com/images/promo/273/Banner-Biếm-Hoạ-Trên-Báo-Chí-SG-Trước-1975.jpg"
                  />
                </div>
                <div className="img">
                  <img
                    style={{ width: "100%" }}
                    src="https://bookish.vn/wp-content/uploads/2022/12/Banner_YES_2022_890x396px-01.jpg"
                  />
                </div>
                <div className="img">
                  <img
                    style={{ width: "100%" }}
                    src="https://nhasachphuongnam.com/images/promo/273/Banner-Công-Chúa-Áo-Đen.jpg"
                    alt=""
                  />
                </div>
              </Carousel>

            </Col>
            <Col span={5}>
              <div class="right-banner image-promotion">
                <a
                  href="https://nhasachphuongnam.com/images/promo/263/Banner_KM_Halloween_890x396px.jpg"
                  class="right-banner__item"
                >
                  <img
                    src="https://nhasachphuongnam.com/images/promo/274/Asset_24.png"
                    alt="Giá rẻ bất ngờ"
                    loading="lazy"
                    class="right-banner__img"
                  />
                </a>
                <a
                  href="https://nhasachphuongnam.com/images/promo/262/Noi_sao_khi_tre_khong_nghe_loi.jpg"
                  class="right-banner__item"
                >
                  <img
                    src="https://nhasachphuongnam.com/images/promo/262/Noi_sao_khi_tre_khong_nghe_loi.jpg"
                    alt="THIẾT KẾ ĐẸP"
                    loading="lazy"
                    class="right-banner__img"
                  />
                </a>
                <a
                  href="https://cdn.ivolunteervietnam.com/wp-content/uploads/2023/07/07092910/cuoc-thi-thiet-ke-lai-bia-sach-nha-nam-1688696946.png"
                  class="right-banner__item"
                >
                  <img
                    style={{ width: "100%", height: 120 }}
                    src="https://cdn.ivolunteervietnam.com/wp-content/uploads/2023/07/07092910/cuoc-thi-thiet-ke-lai-bia-sach-nha-nam-1688696946.png"
                    alt="THIẾT KẾ ĐẸP"
                    loading="lazy"
                    class="right-banner__img"
                  />
                </a>
              </div>
            </Col>
          </Row>
          <div className="product-promotion">
            <div class="product-card">
              <div class="product-image">
                <img
                  src="https://nhasachphuongnam.com/images/promo/274/gift.png"
                  alt="Sách 1"
                />
              </div>
              <div class="product-name">Gift Books For You</div>
            </div>
            <div class="product-card">
              <div class="product-image">
                <img
                  src="https://nhasachphuongnam.com/images/promo/274/gift.png"
                  alt="Sách 2"
                />
              </div>
              <div class="product-name">Chợ sách</div>
            </div>
            <div class="product-card">
              <div class="product-image">
                <img
                  src="https://nhasachphuongnam.com/images/promo/274/manga.png"
                  alt="Sách 3"
                />
              </div>
              <div class="product-name">Manga</div>
            </div>
            <div class="product-card">
              <div class="product-image">
                <img
                  src="https://nhasachphuongnam.com/images/promo/274/teen.png"
                  alt="Sách 2"
                />
              </div>
              <div class="product-name">Tiệc Sách Tuổi Teen</div>
            </div>
            <div class="product-card">
              <div class="product-image">
                <img
                  src="https://nhasachphuongnam.com/images/promo/274/s%C3%A1ch_c%C5%A9.png"
                  alt="Sách 3"
                />
              </div>
              <div class="product-name">Phiên chợ sách</div>
            </div>
            <div class="product-card">
              <div class="product-image">
                <img
                  src="https://nhasachphuongnam.com/images/promo/274/sticker.png"
                  alt="Sách 2"
                />
              </div>
              <div class="product-name">Stickers Sáng Tạo</div>
            </div>
          </div>
        </div>


        <div className="image-one">
          <div className="texty-demo">
            <Texty>Khuyến Mãi</Texty>
          </div>
          <div className="texty-title">
            <p>
              Sách <strong style={{ color: "#FF0000" }}>Mới Xuất Bản</strong>
            </p>
          </div>


          <div className="list-products container" key="1">

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 48 }}
              className="row-product"
            >
              {productsPhone.map((item) => (
                <Col
                  xl={{ span: 6 }}
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                  className="col-product"
                  onClick={() => handleReadMore(item._id)}
                  key={item._id}
                >
                  <div className="show-product">
                    {item.image ? (
                      <img className="image-product" src={item.image} />
                    ) : (
                      <img
                        className="image-product"
                        src={require("../../assets/image/NoImageAvailable.jpg")}
                      />
                    )}
                    <div className="wrapper-products">
                      <Paragraph
                        className="title-product"
                        ellipsis={{ rows: 2 }}
                      >
                        {item.name}
                      </Paragraph>
                      <div className="price-amount">
                        <React.Fragment>
                          {item?.promotion === item?.price ? (
                            <Paragraph className="price-product">
                              {numberWithCommas(item.promotion)} đ
                            </Paragraph>
                          ) : (
                            <React.Fragment>
                              <Paragraph className="price-product">
                                {item?.promotion && numberWithCommas(item.promotion)} đ
                              </Paragraph>
                              <Paragraph className="price-cross">
                                {item.price && numberWithCommas(item.price)} đ
                              </Paragraph>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                  {item?.status === 'Unavailable' || item?.status === 'Discontinued' ? (
                    <Paragraph
                      className="badge"
                      style={{ position: "absolute", top: 10, left: 9 }}
                    >
                      {item?.status === 'Unavailable' ? (
                        <span>Hết hàng</span>
                      ) : (
                        <span>Ngừng kinh doanh</span>
                      )}
                      <img src={triangleTopRight} alt="Triangle" />
                    </Paragraph>
                  ) : (
                    item?.promotion !== item?.price && (
                      <Paragraph
                        className="badge"
                        style={{ position: "absolute", top: 10, left: 9 }}
                      >
                        {item?.audioUrl ? (
                          <span>Sách nói</span>
                        ) : (
                          <span>Giảm giá</span>
                        )}
                        <img src={triangleTopRight} alt="Triangle" />
                      </Paragraph>
                    )
                  )}
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div></div>

        <section class="py-10 bg-white sm:py-16 lg:py-24">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
              <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Làm thế nào để mua hàng?</h2>
              <p class="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">Đăng ký tài khoản miễn phí để bắt đầu trải nghiệm mua sắm.</p>
            </div>

            <div class="relative mt-12 lg:mt-20">
              <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                <img class="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
              </div>

              <div class="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                <div>
                  <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                    <span class="text-xl font-semibold text-gray-700"> 1 </span>
                  </div>
                  <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Tạo tài khoản miễn phí</h3>
                  <p class="mt-4 text-base text-gray-600">Đăng ký tài khoản miễn phí để bắt đầu trải nghiệm mua sắm.</p>
                </div>

                <div>
                  <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                    <span class="text-xl font-semibold text-gray-700"> 2 </span>
                  </div>
                  <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Xây dựng giỏ hàng</h3>
                  <p class="mt-4 text-base text-gray-600">Thêm sản phẩm vào giỏ hàng và tiến hành thanh toán khi đã hoàn tất lựa chọn.</p>
                </div>

                <div>
                  <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                    <span class="text-xl font-semibold text-gray-700"> 3 </span>
                  </div>
                  <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Thanh toán và Giao hàng</h3>
                  <p class="mt-4 text-base text-gray-600">Hoàn tất thanh toán và chờ nhận sản phẩm tại địa chỉ đã cung cấp.</p>
                </div>
              </div>
            </div>
          </div>
        </section>



        <div className="image-one">
          <div className="texty-demo">
            <Texty>Giờ Vàng</Texty>
          </div>
          <div className="texty-title">
            <p>
              Sách <strong style={{ color: "#FF0000" }}>Bán Chạy</strong>
            </p>
          </div>

          <div className="list-products container" key="1">

            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 48 }}
              className="row-product"
            >
              {productsPC.map((item) => (
                <Col
                  xl={{ span: 6 }}
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                  className="col-product"
                  onClick={() => handleReadMore(item._id)}
                  key={item._id}
                >
                  <div className="show-product">
                    {item.image ? (
                      <img className="image-product" src={item.image} />
                    ) : (
                      <img
                        className="image-product"
                        src={require("../../assets/image/NoImageAvailable.jpg")}
                      />
                    )}
                    <div className="wrapper-products">
                      <Paragraph
                        className="title-product"
                        ellipsis={{ rows: 2 }}
                      >
                        {item.name}
                      </Paragraph>
                      <div className="price-amount">
                        <React.Fragment>
                          {item?.promotion === item?.price ? (
                            <Paragraph className="price-product">
                              {numberWithCommas(item.promotion)} đ
                            </Paragraph>
                          ) : (
                            <React.Fragment>
                              <Paragraph className="price-product">
                                {item?.promotion && numberWithCommas(item.promotion)} đ
                              </Paragraph>
                              <Paragraph className="price-cross">
                                {item.price && numberWithCommas(item.price)} đ
                              </Paragraph>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                  {item?.status === 'Unavailable' || item?.status === 'Discontinued' ? (
                    <Paragraph
                      className="badge"
                      style={{ position: "absolute", top: 10, left: 9 }}
                    >
                      {item?.status === 'Unavailable' ? (
                        <span>Hết hàng</span>
                      ) : (
                        <span>Ngừng kinh doanh</span>
                      )}
                      <img src={triangleTopRight} alt="Triangle" />
                    </Paragraph>
                  ) : (
                    item?.promotion !== item?.price && (
                      <Paragraph
                        className="badge"
                        style={{ position: "absolute", top: 10, left: 9 }}
                      >
                        {item?.audioUrl ? (
                          <span>Sách nói</span>
                        ) : (
                          <span>Giảm giá</span>
                        )}
                        <img src={triangleTopRight} alt="Triangle" />
                      </Paragraph>
                    )
                  )}
                </Col>
              ))}
            </Row>
          </div>
        </div>

        <div className="image-one">
          <div className="texty-demo">
            <Texty>Giờ Vàng</Texty>
          </div>
          <div className="texty-title">
            <p>
              Giảm Giá <strong style={{ color: "#FF0000" }}>Đặc Biệt</strong>
            </p>
          </div>

          <div className="list-products container" key="1">
            <Row>

            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 48 }}
              className="row-product"
            >
              {productsTablet.map((item) => (
                <Col
                  xl={{ span: 6 }}
                  lg={{ span: 8 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                  className="col-product"
                  onClick={() => handleReadMore(item._id)}
                  key={item._id}
                >
                  <div className="show-product">
                    {item.image ? (
                      <img className="image-product" src={item.image} />
                    ) : (
                      <img
                        className="image-product"
                        src={require("../../assets/image/NoImageAvailable.jpg")}
                      />
                    )}
                    <div className="wrapper-products">
                      <Paragraph
                        className="title-product"
                        ellipsis={{ rows: 2 }}
                      >
                        {item.name}
                      </Paragraph>
                      <div className="price-amount">
                        <React.Fragment>
                          {item?.promotion === item?.price ? (
                            <Paragraph className="price-product">
                              {numberWithCommas(item.promotion)} đ
                            </Paragraph>
                          ) : (
                            <React.Fragment>
                              <Paragraph className="price-product">
                                {item?.promotion && numberWithCommas(item.promotion)} đ
                              </Paragraph>
                              <Paragraph className="price-cross">
                                {item.price && numberWithCommas(item.price)} đ
                              </Paragraph>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                  {item?.status === 'Unavailable' || item?.status === 'Discontinued' ? (
                    <Paragraph
                      className="badge"
                      style={{ position: "absolute", top: 10, left: 9 }}
                    >
                      {item?.status === 'Unavailable' ? (
                        <span>Hết hàng</span>
                      ) : (
                        <span>Ngừng kinh doanh</span>
                      )}
                      <img src={triangleTopRight} alt="Triangle" />
                    </Paragraph>
                  ) : (
                    item?.promotion !== item?.price && (
                      <Paragraph
                        className="badge"
                        style={{ position: "absolute", top: 10, left: 9 }}
                      >
                        {item?.audioUrl ? (
                          <span>Sách nói</span>
                        ) : (
                          <span>Giảm giá</span>
                        )}
                        <img src={triangleTopRight} alt="Triangle" />
                      </Paragraph>
                    )
                  )}
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>

      <BackTop style={{ textAlign: "right" }} />
    </Spin>
  );
};

export default Home;
