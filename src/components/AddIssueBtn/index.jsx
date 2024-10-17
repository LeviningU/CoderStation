import React from "react";

import { Button, message } from "antd";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AddIssueBtn() {

    const navigate = useNavigate();
    const isLogin = useSelector((state) => state.user.isLogin);

    const handleClick = () => {
        if (!isLogin) {
            message.warning("请先登录");
            return;
        }
        navigate("/addIssue");
    }

    return <Button type="primary" size="large" style={{
        width : "100%",
        marginBottom : "30px"
    }} onClick={handleClick}>
        我要提问
    </Button>;
}
