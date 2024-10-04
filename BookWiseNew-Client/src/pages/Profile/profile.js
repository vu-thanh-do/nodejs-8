import { PhoneOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Spin,
    notification
} from 'antd';
import React, { useEffect, useState } from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import { useHistory } from 'react-router-dom';
import userApi from "../../apis/userApi";
import "./profile.css";


const Profile = () => {
    const [event, setEvent] = useState([]);
    const [eventTemp, setEventTemp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [userData, setUserData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});

    const history = useHistory();

    const { data, isLoading, errorMessage } = useOpenWeather({
        key: '03b81b9c18944e6495d890b189357388',
        lat: '21.028511',
        lon: '105.804817',
        lang: 'vi',
        unit: 'metric', // values are (metric, standard, imperial)
    });

    const handleEditProfile = () => {
        setEditedUserData(userData);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSave = async () => {
        console.log(editedUserData);
        const local = localStorage.getItem("user");
        const user = JSON.parse(local);
        editedUserData._id = user?._id;
        try {
            const response = await userApi.updateProfile(editedUserData);
            if(response){
                const response = await userApi.getProfileById(user?._id);
                setUserData(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.reload();
            }
            notification.success({ message: 'Cập nhật thông tin thành công' });
            setIsModalVisible(false);
        } catch (error) {
            console.log('Failed to update profile:', error);
            notification.error({ message: 'Có lỗi xảy ra khi cập nhật thông tin' });
        }
    };

    useEffect(() => {
        (async () => {
            try {
                const local = localStorage.getItem("user");
                const user = JSON.parse(local);
                console.log(user);
                setUserData(user);
            } catch (error) {
                console.log('Failed to fetch profile user:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginBottom: 25, marginTop: 25 }}>
                    <div className='container'>
                        <Row justify="center">
                            <Col span="9" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                                <Card hoverable={true} className="profile-card" style={{ padding: 0, margin: 0 }}>
                                    <Row justify="center" style={{ padding: 20 }}>
                                        <img src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" style={{ width: 150, height: 150 }}></img>
                                    </Row>
                                    <Row justify="center">
                                        <Col span="24">
                                            <Row justify="center">
                                                <strong style={{ fontSize: 18 }}>{userData.username}</strong>
                                            </Row>
                                            <Row justify="center">
                                                <p style={{ padding: 0, margin: 0, marginBottom: 5 }}>{userData.email}</p>
                                            </Row>
                                            <Row justify="center">
                                                <p>{userData.birthday}</p>
                                            </Row>
                                            <Divider style={{ padding: 0, margin: 0 }} ></Divider>
                                            <Row justify="center" style={{ marginTop: 10 }}>
                                                <Col span="4">
                                                    <Row justify="center">
                                                        <p>{<UserOutlined />}</p>
                                                        <p style={{ marginLeft: 5 }}>{userData.gender}</p>
                                                    </Row>
                                                </Col>
                                                <Col span="8">
                                                    <Row justify="center">
                                                        <p>{<SafetyOutlined />}</p>
                                                        <p style={{ marginLeft: 5 }}>{userData.type}</p>
                                                    </Row>
                                                </Col>
                                                <Col span="8">
                                                    <Row justify="center">
                                                        <p>{<PhoneOutlined />}</p>
                                                        <p style={{ marginLeft: 5 }}>{userData.phone}</p>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row justify="center" style={{ marginTop: 20, marginBottom: 15 }}>
                                                <Button type="primary" onClick={handleEditProfile}>
                                                    Chỉnh sửa profile
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>

                            <Col span="6" style={{ marginTop: 20 }}>
                               
                            </Col>
                        </Row>
                    </div>
                </div>
            </Spin>

            <Modal
                title="Chỉnh sửa profile"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={editedUserData}
                    onValuesChange={(changedValues, allValues) => {
                        setEditedUserData(allValues);
                    }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email' }]}

                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[{ required: true, message: 'Please enter your birthday' }]}
                    >
                        <Input />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default Profile;
