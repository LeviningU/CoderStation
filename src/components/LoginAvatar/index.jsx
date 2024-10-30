import "./index.module.css";

import React from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

import { Button, Popover, List, Avatar } from "antd";

export default function LoginAvatar(props) {
    const {isLogin, user} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let dom = null;

    const listClickHandler = (item) => {
        if (item === "个人中心") {
            navigate("/personal");
        } else if (item === "退出登录") {
            localStorage.removeItem("token");
            dispatch(logout());
            navigate("/");
        }
    }

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
                                    onClick={() => {
                                        listClickHandler(item);
                                    }}
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
