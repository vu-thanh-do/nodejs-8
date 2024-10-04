import {
    FormOutlined,
    HomeOutlined, PhoneOutlined,
    UserOutlined
} from '@ant-design/icons';
import {
    Breadcrumb,
    Card,
    Col,
    Divider,
    Row,
    Spin
} from 'antd';
import React, { useEffect, useState } from 'react';
import userApi from "../../apis/userApi";
import "./profile.css";

const Profile = () => {

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await userApi.getProfile();
                console.log(response);
                setUserData(response.user);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch profile user:' + error);
            }
        })();
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div>
            <Spin spinning={loading}>
                <div style={{ marginTop: 20, marginLeft: 24 }}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <FormOutlined />
                            <span>Trang cá nhân</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div>
                    <div>
                        <Row justify="center">
                            <Col span="9" style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
                                <Card hoverable={true} className="profile-card" style={{ padding: 0, margin: 0 }}>
                                    <Row justify="center">
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
                                                        <p style={{ marginLeft: 5 }}>{userData.role}</p>
                                                    </Row>
                                                </Col>
                                                <Col span="8">
                                                    <Row justify="center">
                                                        <p>{<PhoneOutlined />}</p>
                                                        <p style={{ marginLeft: 5 }}>{userData.phone}</p>
                                                    </Row>
                                                </Col>
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
        </div >
    )
}

export default Profile;