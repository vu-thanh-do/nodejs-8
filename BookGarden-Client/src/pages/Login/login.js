import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Modal, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import userApi from "../../apis/userApi";
import "./login.css";

const Login = () => {
  const [isLogin, setLogin] = useState(true);
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);
  const [forgotPasswordForm] = Form.useForm();
  const [loginError, setLoginError] = useState(false);
  let history = useHistory();

  const onFinish = (values) => {
    userApi
      .login(values.email, values.password)
      .then(function (response) {
        console.log(response);
        if (
          response.user.role === "isClient" &&
          response.user.status !== "noactive"
        ) {
          history.push("/home");
        } else {
          setLoginError(true);
          notification.error({
            message: `Thông báo`,
            description: "Bạn không có quyền truy cập vào hệ thống",
          });
        }
      })
      .catch((error) => {
        setLoginError(true);
        console.log("email or password error" + error);
      });
  };

  const handleForgotPasswordSubmit = async () => {
    const values = await forgotPasswordForm.validateFields();
    console.log(values.email);

    try {
      const data = { email: values.email };
      await userApi.forgotPassword(data);
      notification.success({
        message: "Thông báo",
        description: "Đã gửi đường dẫn đổi mật khẩu qua email.",
      });
      setForgotPasswordModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đã có lỗi xảy ra khi gửi đường dẫn đổi mật khẩu.",
      });
      console.error("Forgot password error:", error);
    }
  };

  const showForgotPasswordModal = () => {
    setForgotPasswordModalVisible(true);
  };

  const handleForgotPasswordCancel = () => {
    setForgotPasswordModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-green-600">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <img className="h-16" src="/logo.png" alt="Logo" />
        </div>
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Đăng nhập
        </h3>

        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {loginError && (
            <Form.Item>
              <Alert
                message="Tài khoản hoặc mật khẩu sai"
                type="error"
                showIcon
              />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Email"
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 mb-2"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Mật khẩu"
              className="rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 mb-2"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md"
            >
              Đăng Nhập
            </Button>
          </Form.Item>
          <Form.Item>
            <a
              onClick={showForgotPasswordModal}
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Quên mật khẩu?
            </a>
          </Form.Item>
        </Form>

        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-600">Bạn chưa có tài khoản? </span>
          <Link
            to="/register"
            className="text-sm font-bold text-blue-500 hover:text-blue-700 hover:underline"
          >
            Đăng ký
          </Link>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Link
            to="/home"
            className="text-sm font-bold text-blue-500 hover:text-blue-700 hover:underline"
          >
            Quay lại trang chính
          </Link>
        </div>
      </div>

      <Modal
        title="Quên mật khẩu"
        visible={forgotPasswordModalVisible}
        onCancel={handleForgotPasswordCancel}
        footer={[
          <Button key="back" onClick={handleForgotPasswordCancel}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleForgotPasswordSubmit}
          >
            Gửi đường dẫn đổi mật khẩu
          </Button>,
        ]}
      >
        <Form
          name="forgot_password"
          onFinish={handleForgotPasswordSubmit}
          form={forgotPasswordForm}
        >
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "Email không hợp lệ" },
              { required: true, message: "Vui lòng nhập email" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
