import React from "react";
import styles from "./index.module.css";
import { useState, useRef, useEffect } from "react";

import { login } from "../../redux/userSlice";
import { useDispatch } from "react-redux";

import { Modal, Radio, Form, Input, Button, Checkbox, Row, Col, message } from "antd";

import { getCaptcha, userIsExist, addUser } from "../../api/user";

export default function LoginForm(props) {
    const [value, setValue] = useState(1);

    const [loginInfo, setLoginInfo] = useState({
        loginId: "",
        loginPwd: "",
        captcha: "",
        remember: false,
    });

    const [registerInfo, setRegisterInfo] = useState({
        loginId: "",
        nickname: "",
        captcha: "",
    });

    const [captcha, setCaptcha] = useState("");
    const fetchCaptcha = () => {
        getCaptcha().then((res) => {
            setCaptcha(res);
        });
    };
    useEffect(() => {
        if (props.isModalShow) {
            fetchCaptcha();
        }
    }, [props.isModalShow]);

    const loginFormRef = useRef(null);
    const registerFormRef = useRef(null);

    const updateInfo = (info, value, key, setInfo) => {
        setInfo({
            ...info,
            [key]: value,
        });
    };

    const dispatch = useDispatch();
    const loginHandle = () => {
        console.log("loginHandle", loginInfo);
    };

    const registerHandle = async () => {
        const res = await addUser(registerInfo);
        if (res.data) {
            message.success("注册成功，默认密码为 123456");
            dispatch(login(res.data));
            handleCancel();
        }
        else {
            message.warning(res.msg);
            fetchCaptcha();
        }
    };

    const captchaClickHandle = () => {
        fetchCaptcha();
    };

    const handleOk = () => {
        props.onClose();
    };

    const handleCancel = () => {
        setRegisterInfo({
            loginId: "",
            nickname: "",
            captcha: "",
        });
        setLoginInfo({
            loginId: "",
            loginPwd: "",
            captcha: "",
            remember: false,
        });
        props.onClose();
    };

    const checkLoginIdIsExist = async () => {
        if (registerInfo.loginId) {
            const data = await userIsExist(registerInfo.loginId);
            if (data.data) {
                return Promise.reject("用户已存在");
            }
        }
    }

    let board = null;
    if (value === 1) {
        board = (
            <div className={styles.container}>
                <Form
                    name="basic1"
                    autoComplete="off"
                    onFinish={loginHandle}
                    ref={loginFormRef}
                    labelCol={{ span: 5 }}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号",
                            },
                        ]}
                    >
                        <Input
                            placeholder="请输入你的登录账号"
                            value={loginInfo.loginId}
                            onChange={(e) =>
                                updateInfo(
                                    loginInfo,
                                    e.target.value,
                                    "loginId",
                                    setLoginInfo
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="登录密码"
                        name="loginPwd"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="请输入你的登录密码，新用户默认为123456"
                            value={loginInfo.loginPwd}
                            onChange={(e) =>
                                updateInfo(
                                    loginInfo,
                                    e.target.value,
                                    "loginPwd",
                                    setLoginInfo
                                )
                            }
                        />
                    </Form.Item>

                    {/* 验证码 */}
                    <Form.Item
                        name="logincaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: "请输入验证码",
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={loginInfo.captcha}
                                    onChange={(e) =>
                                        updateInfo(
                                            loginInfo,
                                            e.target.value,
                                            "captcha",
                                            setLoginInfo
                                        )
                                    }
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{
                                        __html: captcha,
                                    }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Checkbox
                            onChange={(e) =>
                                updateInfo(
                                    loginInfo,
                                    e.target.checked,
                                    "remember",
                                    setLoginInfo
                                )
                            }
                            checked={loginInfo.remember}
                        >
                            记住我
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            登录
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    } else if (value === 2) {
        board = (
            <div className={styles.container}>
                <Form
                    name="basic2"
                    autoComplete="off"
                    ref={registerFormRef}
                    onFinish={registerHandle}
                    labelCol={{ span: 5 }}
                >
                    <Form.Item
                        label="登录账号"
                        name="loginId"
                        rules={[
                            {
                                required: true,
                                message: "请输入账号，仅此项为必填项",
                            },
                            // 验证用户是否已经存在
                            { validator: checkLoginIdIsExist },
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input
                            placeholder="请输入账号"
                            value={registerInfo.loginId}
                            onChange={(e) =>
                                updateInfo(
                                    registerInfo,
                                    e.target.value,
                                    "loginId",
                                    setRegisterInfo
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item label="用户昵称" name="nickname">
                        <Input
                            placeholder="请输入昵称，不填写默认为新用户xxx"
                            value={registerInfo.nickname}
                            onChange={(e) =>
                                updateInfo(
                                    registerInfo,
                                    e.target.value,
                                    "nickname",
                                    setRegisterInfo
                                )
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        name="registercaptcha"
                        label="验证码"
                        rules={[
                            {
                                required: true,
                                message: "请输入验证码",
                            },
                        ]}
                    >
                        <Row align="middle">
                            <Col span={16}>
                                <Input
                                    placeholder="请输入验证码"
                                    value={registerInfo.captcha}
                                    onChange={(e) =>
                                        updateInfo(
                                            registerInfo,
                                            e.target.value,
                                            "captcha",
                                            setRegisterInfo
                                        )
                                    }
                                />
                            </Col>
                            <Col span={6}>
                                <div
                                    className={styles.captchaImg}
                                    onClick={captchaClickHandle}
                                    dangerouslySetInnerHTML={{
                                        __html: captcha,
                                    }}
                                ></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 5,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 20 }}
                        >
                            注册
                        </Button>
                        <Button type="primary" htmlType="submit">
                            重置
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    return (
        <div>
            <Modal
                title="登录/注册"
                open={props.isModalShow}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Radio.Group
                    optionType="button"
                    buttonStyle="solid"
                    className={styles.radioGroup}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        fetchCaptcha()
                    }}
                >
                    <Radio value={1} className={styles.radioButton}>
                        登录
                    </Radio>
                    <Radio value={2} className={styles.radioButton}>
                        注册
                    </Radio>
                </Radio.Group>
                {board}
            </Modal>
        </div>
    );
}
