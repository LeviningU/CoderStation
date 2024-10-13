import "./index.module.css";

import React from "react";

import { useSelector } from "react-redux";

import { Button, Popover, List, Avatar } from "antd";

export default function LoginAvatar(props) {
    const {isLogin, user} = useSelector((state) => state.user);

    let dom = null;

    if (isLogin) {
        dom = (
            <div className="loginBtnContainer">
                <Popover
                    content={
                        <List
                            size="large"
                            dataSource={["个人中心", "退出登录"]}
                            renderItem={(item) => (
                                <List.Item
                                    size="large"
                                    style={{ cursor: "pointer" }}
                                >
                                    {item}
                                </List.Item>
                            )}
                        />
                    }
                    size="large"
                    placement="bottom"
                >
                    <Avatar
                        size="large"
                        src={user?.avatar}
                        preview={false}
                    />
                </Popover>
            </div>
        );
    } else {
        dom = (
            <div className="loginBtnContainer">
                <Button type="primary" size="large" onClick={props.onClick}>
                    登录/注册
                </Button>
            </div>
        );
    }

    return <div>{dom}</div>;
}
