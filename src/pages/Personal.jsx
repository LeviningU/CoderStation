import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import PageHeader from "../components/PageHeader";
import PersonalInfoItem from "../components/PersonalInfoItem";

import { Card, Avatar, Upload, Modal, Form, Input, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./Personal.module.css";

import { formatTime } from "../utils/tools";

import { logout, updateUserInfoAsync } from "../redux/userSlice";

import { checkPasswordApi } from "../api/user";

export default function Personal() {
    const user = useSelector((state) => state.user.user);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [pannel, setPannel] = React.useState("");
    const [passwordInfo, setPasswordInfo] = React.useState({
        oldpassword: "",
        newpassword: "",
        passwordConfirm: ""
    });
    const [editInfo, setEditInfo] = React.useState({});

    if (!user) {
        return <div>
            <PageHeader title="加载中..." />
        </div>
    }

    function updatePasswordInfo(value, key) {
        setPasswordInfo({
            ...passwordInfo,
            [key]: value
        });
        if (key === "newpassword") {
            updateInfo(value, "loginPwd");
        }
    }


    function handleAvatarChange(newUrl) {
        dispatch(
            updateUserInfoAsync({
                userId: user._id,
                newInfo: {
                    avatar: newUrl,
                },
            })
        );
        message.success("修改成功");
    }

    function handleOpen(pannel) {
        setEditInfo({});
        setPannel(pannel);
        setOpen(true);
    }

    function handleOk() {
        dispatch(
            updateUserInfoAsync({
                userId: user._id,
                newInfo: editInfo
            })
        );
        message.success("修改成功");
        setOpen(false);
        if ("loginPwd" in editInfo) {
            localStorage.removeItem("token");
            dispatch(logout());
            navigate("/");
        }
    }

    function handleCancel() {
        setOpen(false);
    }

    function updateInfo(value, key) {
        if (key === "nickname" && !value) {
            message.warning("昵称不能为空");
            return;
        }
        const newInfo = {
            ...editInfo,
            [key]: value
        }
        setEditInfo(newInfo);
    }

    async function checkPasswordIsRight(rule, value) {
        if (!value) {
            return;
        }
        const res = await checkPasswordApi(user._id, value);
        if (res.data) {
            return Promise.resolve();
        } else {
            return Promise.reject("密码错误");
        }
    }

    let form = null;
    switch (pannel) {
        case "基本信息": {
            form = (
                <>
                    <Form
                        name="basic1"
                        autoComplete="off"
                        onFinish={handleOk}
                        initialValues={user}
                        style={{ marginTop: "20px" }}
                        labelCol={{ span: 5 }}
                        
                    >
                        {/* 登录密码 */}
                        <Form.Item
                            label="登录密码"
                            name="oldpassword"
                            rules={[
                                { required: true, message: "请输入旧密码" },
                                {
                                    validator: checkPasswordIsRight
                                }
                            ]}
                            validateTrigger='onBlur'
                        >
                            <Input.Password
                                rows={6}
                                autoComplete="current-password"
                                value={passwordInfo.oldpassword}
                                placeholder="如果要修改密码，请先输入旧密码"
                                onChange={(e) => updatePasswordInfo(e.target.value, 'oldpassword')}
                            />
                        </Form.Item>

                        {/* 新的登录密码 */}
                        <Form.Item
                            label="新密码"
                            name="newpassword"
                            rules={[
                                { required: true, message: "请输入新密码" },
                            ]}
                        >
                            <Input.Password
                                rows={6}
                                value={passwordInfo.newpassword}
                                placeholder="请输入新密码"
                                autoComplete="new-password"
                                onChange={(e) => updatePasswordInfo(e.target.value, 'newpassword')}
                            />
                        </Form.Item>

                        {/* 确认密码 */}
                        <Form.Item
                            label="确认密码"
                            name="passwordConfirm"
                            rules={[
                                { required: true, message: "请确认密码" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newpassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('两次密码不一致'));
                                    },
                                }),
                            ]}
                            validateTrigger='onBlur'
                        >
                            <Input.Password
                                autoComplete="current-password"
                                rows={6}
                                placeholder="请确认密码"
                                value={passwordInfo.passwordConfirm}
                                onChange={(e) => updatePasswordInfo(e.target.value, 'passwordConfirm')}
                            />
                        </Form.Item>

                        {/* 用户昵称 */}
                        <Form.Item
                            label="用户昵称"
                            name="nickname"
                        >
                            <Input
                                placeholder="昵称可选，默认为新用户"
                                value={user.nickname}
                                onBlur={(e) => updateInfo(e.target.value, 'nickname')}
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>

                            <Button type="link" htmlType="reset" className="resetBtn">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
            break;
        }
        case "社交账号": {
            form = (
                <>
                    <Form
                        name="basic2"
                        initialValues={user}
                        autoComplete="off"
                        onFinish={handleOk}
                        style={{ marginTop: "20px" }}
                        labelCol={{ span: 5 }}
                    >
                        <Form.Item
                            label="邮箱"
                            name="mail"
                        >
                            <Input
                                value={user.mail}
                                placeholder="请填写邮箱"
                                onChange={(e) => updateInfo(e.target.value, 'mail')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="QQ号"
                            name="qq"
                        >
                            <Input
                                value={user.qq}
                                placeholder="请填写 QQ 号"
                                onChange={(e) => updateInfo(e.target.value, 'qq')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="微信"
                            name="wechat"
                        >
                            <Input
                                value={user.wechat}
                                placeholder="请填写微信号"
                                onChange={(e) => updateInfo(e.target.value, 'wechat')}
                            />
                        </Form.Item>
                        <Form.Item
                            label="github"
                            name="github"
                        >
                            <Input
                                value={user.github}
                                placeholder="请填写 github "
                                onChange={(e) => updateInfo(e.target.value, 'github')}
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>

                            <Button type="link" htmlType="submit" className="resetBtn">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
            break;
        }
        case "个人简介": {
            form = (
                <>
                    <Form
                        name="basic3"
                        initialValues={user}
                        autoComplete="off"
                        onFinish={handleOk}
                        style={{ marginTop: "20px" }}
                        labelCol={{ span: 5 }}
                    >
                        {/* 自我介绍 */}
                        <Form.Item
                            label="自我介绍"
                            name="intro"
                        >
                            <Input.TextArea
                                rows={6}
                                value={user.intro}
                                placeholder="选填"
                                onChange={(e) => updateInfo(e.target.value, 'intro')}
                            />
                        </Form.Item>

                        {/* 确认修改按钮 */}
                        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                确认
                            </Button>

                            <Button type="link" htmlType="submit" className="resetBtn">
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )
            break;
        }
        default: {
            break;
        }
    }

    return (
        user === null ? <div>
            <PageHeader title="加载中..." />
        </div> :
        <div>
            <PageHeader title="个人中心" />
            <div className={styles.container}>
                <div className={styles.row}>
                    <Card
                        title="基本信息"
                        extra={<div onClick={() => {handleOpen("基本信息")}} className={styles.edit}>编辑</div>}
                        className={styles.card}
                    >
                        <PersonalInfoItem
                            label="登录账号"
                            value={user.loginId}
                        />
                        <PersonalInfoItem label="账号密码" value="******" />
                        <PersonalInfoItem
                            label="用户昵称"
                            value={user.nickname}
                        />
                        <PersonalInfoItem
                            label="用户积分"
                            value={user.points}
                        />
                        <PersonalInfoItem
                            label="注册时间"
                            value={formatTime(+user.registerDate, "year")}
                        />
                        <PersonalInfoItem
                            label="登录时间"
                            value={formatTime(+user.lastLoginDate, "year")}
                        />
                        <PersonalInfoItem
                            label="当前头像"
                            append={
                                <div>
                                    <Avatar
                                        size={100}
                                        src={<img src={user.avatar} alt="" />}
                                    />
                                </div>
                            }
                        />
                        <PersonalInfoItem
                            label="上传头像"
                            append={
                                <Upload
                                    action="/api/upload"
                                    maxCount={1}
                                    listType="picture-card"
                                    onChange={(info) => {
                                        if (info.file.status === "done") {
                                            handleAvatarChange(
                                                info.file.response.data
                                            );
                                        }
                                    }}
                                >
                                    <PlusOutlined size={128} />
                                </Upload>
                            }
                        />
                    </Card>
                </div>
                <div className={styles.row}>
                    <Card
                        title="社交账号"
                        extra={<div onClick={() => {handleOpen("社交账号")}}  className={styles.edit}>编辑</div>}
                        className={styles.card}
                    >
                        <PersonalInfoItem
                            label="邮箱"
                            value={user.mail || "未填写"}
                        />
                        <PersonalInfoItem
                            label="QQ号"
                            value={user.qq || "未填写"}
                        />
                        <PersonalInfoItem
                            label="微信"
                            value={user.wechat || "未填写"}
                        />
                        <PersonalInfoItem
                            label="github"
                            value={user.github || "未填写"}
                        />
                    </Card>
                </div>
                <div className={styles.row}>
                    <Card
                        title="个人简介"
                        extra={<div onClick={() => {handleOpen("个人简介")}}  className={styles.edit}>编辑</div>}
                        className={styles.card}
                    >
                        <p className={styles.intro}>{user.intro || "未填写"}</p>
                    </Card>
                </div>
            </div>
            <Modal
                open={open}
                title={pannel}
                onCancel={handleCancel}
                footer={false}
            >
                {form}
            </Modal>
        </div>
    );
}
