import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, Card, Row, Col, Typography, Spin, notification } from "antd"; // Import notification từ antd
import { useParams } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import productApi from "../../apis/productApi";
import { Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const Complaint = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [order, setOrder] = useState(null);
  const [complaint, setComplaint] = useState(null); // Để lưu thông tin khiếu nại
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Lấy thông tin đơn hàng từ API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await productApi.get(`/order/${id}`);
        setOrder(response.data);
      } catch (error) {
        setError("Lỗi khi tải dữ liệu đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    const fetchComplaintDetails = async () => {
      try {
        const response = await axiosClient.get(`/complaint/${id}`); // Lấy thông tin khiếu nại theo orderId
        setComplaint(response.data);
      } catch (error) {
        setError("Lỗi khi tải thông tin khiếu nại.");
      }
    };

    fetchOrderDetails();
    fetchComplaintDetails();
  }, [id]);

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được upload file hình ảnh!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2; // Giới hạn 2MB
    if (!isLt2M) {
      message.error("Hình ảnh phải nhỏ hơn 2MB!");
      return Upload.LIST_IGNORE;
    }
    return isImage && isLt2M;
  };
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("orderId", id);
    formData.append("reason", values.reason);
    formData.append("option", values.option);
    formData.append("description", values.description);

    // Gắn file vào formData
    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      await axiosClient.post("/complaint", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({ message: "Khách hàng khiếu nại thành công!" });
      setFileList([]); // Xóa danh sách file sau khi gửi thành công
    } catch (error) {
      notification.error({ message: "Lỗi khi gửi khiếu nại." });
    }
  };



  return (
    <div style={{ padding: "20px", backgroundColor: "#121212", minHeight: "100vh", color: "#fff" }}>
      <Spin spinning={loading}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card style={{ backgroundColor: "#1c1c1c", border: "none" }} bodyStyle={{ padding: "20px" }}>
                <Title level={4} style={{ color: "#fff" }}>Đơn hàng đã chọn</Title>
                {order ? (
                  <Row gutter={[16, 16]}>
                    <Col span={24}>
                      <Card style={{ backgroundColor: "#1c1c1c", border: "none" }} bodyStyle={{ padding: "20px" }}>
                        <Title level={4} style={{ color: "#fff" }}>Đơn hàng đã chọn</Title>
                        <Row gutter={[16, 16]}>
                          {order.products && order.products.length > 0 ? (
                            order.products.map((item, index) => (
                              <Col key={index} span={24}>
                                <Row gutter={[16, 16]}>
                                  <Col span={4}>
                                    <img
                                      src={item.product?.image || "https://via.placeholder.com/100"}
                                      alt={item.product?.name || "Product"}
                                      style={{ width: "100%", borderRadius: "5px" }}
                                    />
                                  </Col>
                                  <Col span={20}>
                                    <Text style={{ color: "#fff", display: "block", fontSize: "16px" }}>
                                      {item.product?.name}
                                    </Text>
                                    <Text style={{ color: "#999", display: "block" }}>
                                      {item.product?.description}
                                    </Text>
                                    <Text style={{ color: "#28a745", display: "block" }}>{order.status}</Text>
                                    <Text style={{ color: "#fff", display: "block", marginTop: "10px" }}>
                                      <del style={{ color: "#999", marginRight: "8px" }}>
                                        {item.product?.originalPrice?.toLocaleString("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        })}
                                      </del>
                                      {item.product?.salePrice?.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </Text>
                                  </Col>
                                </Row>
                              </Col>
                            ))
                          ) : (
                            <Text style={{ color: "#fff" }}>Không có sản phẩm trong đơn hàng.</Text>
                          )}
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                ) : (
                  <Text style={{ color: "#fff" }}>Không tìm thấy thông tin đơn hàng.</Text>
                )}

              </Card>
            </Col>

            {/* Hiển thị khiếu nại */}
            {complaint && (
              <Col span={24}>
                <Card style={{ backgroundColor: "#1c1c1c", border: "none" }} bodyStyle={{ padding: "20px" }}>
                  <Title level={4} style={{ color: "#fff" }}>Thông tin khiếu nại</Title>
                  <Text style={{ color: "#fff", display: "block" }}>
                    <strong>Lý do:</strong> {complaint.reason}
                  </Text>
                  <Text style={{ color: "#fff", display: "block" }}>
                    <strong>Mô tả:</strong> {complaint.description}
                  </Text>
                </Card>
              </Col>
            )}

            {/* Form gửi khiếu nại mới */}
            <Col span={24}>
              <Card style={{ backgroundColor: "#1c1c1c", border: "none" }} bodyStyle={{ padding: "20px" }}>
                <Title level={4} style={{ color: "#fff" }}>Chọn sản phẩm cần Trả hàng và Hoàn tiền</Title>
                <Form layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="reason"
                    label={<Text style={{ color: "#fff" }}>* Lý do:</Text>}
                    rules={[{ required: true, message: "Vui lòng chọn lý do!" }]}
                  >
                    <Select placeholder="Chọn Lý Do">
                      <Option value="wrong-item">Giao sai hàng</Option>
                      <Option value="damaged">Sản phẩm bị hư hỏng</Option>
                      <Option value="other">Khác</Option>
                    </Select>
                  </Form.Item>

                  {/* Thêm phần chọn phương án */}
                  <Form.Item
                    name="option"
                    label={<Text style={{ color: "#fff" }}>Phương án:</Text>}
                    rules={[{ required: true, message: "Vui lòng chọn phương án!" }]}
                  >
                    <Select placeholder="Chọn phương án">
                      <Option value="return-refund">Hoàn hàng - Trả tiền</Option>
                      <Option value="refund-only">Chỉ trả tiền</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label={<Text style={{ color: "#fff" }}>Mô tả:</Text>}
                    rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                  >
                    <TextArea rows={4} placeholder="Chi tiết vấn đề bạn gặp phải" maxLength={2000} />
                  </Form.Item>
                  <Form.Item
                    label={<Text style={{ color: "#fff" }}>Ảnh minh họa:</Text>}
                  >
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={handleUploadChange}
                      beforeUpload={beforeUpload}
                      multiple={true} // Cho phép upload nhiều file
                      maxCount={3} // Giới hạn tối đa 3 file
                      style={{
                        borderColor: "#28a745", // Màu xanh lá cây
                      }}
                    >
                      {fileList.length >= 3 ? null : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Tải lên</div>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ backgroundColor: "#28a745", border: "none", mt: 2 }}
                    >
                      Gửi khiếu nại
                    </Button>
                  </Form.Item>
                </Form>

              </Card>
            </Col>
          </Row>
        )}
      </Spin>
    </div>
  );
};

export default Complaint;
