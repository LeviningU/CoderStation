import React from "react";
import { NavLink } from "react-router-dom";
import { Input, Select, Space } from "antd";

import LoginAvatar from "./LoginAvatar";

export default function NavHeader(props) {
    return <div className="headerContainer">
        <div className="logoContainer">
            <div className="logo"></div>
        </div>
        <div className="navContainer">
            <NavLink className="navgation" to="/">问答</NavLink>
            <NavLink className="navgation" to="/books">书籍</NavLink>
            <NavLink className="navgation" to="/interviews">面试题</NavLink>
            <a href="https://levin.ink" className="navgation" target="_blank" rel="noreferrer">博客</a>
        </div>
        <Space.Compact size="large" className="searchContainer">
            <Select defaultValue="issue" style={{ width: "20%" }}>
                <Select.Option value="issue">问答</Select.Option>
                <Select.Option value="book">书籍</Select.Option>
            </Select>
            <Input.Search
                placeholder="请输入搜索内容"
                allowClear
                enterButton="搜索"
                style={{ width: "80%" }}
            />
        </Space.Compact>
        <LoginAvatar onClick={props.onClick} />
    </div>;
}
