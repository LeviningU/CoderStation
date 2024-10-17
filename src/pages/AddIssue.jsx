import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypeList } from "../redux/typeSlice.js";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Select, message } from "antd";
import styles from "./AddIssue.module.css";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { typeOptionCreator } from "../utils/tools.js";

import { addIssueApi } from "../api/issue.js";

export default function AddIssue() {

    const typeList = useSelector((state) => state.type.typeList);
    const userInfo = useSelector((state) => state.user.user)
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        }
        // eslint-disable-next-line
    }, [typeList]);

    const [issueInfo, setIssueInfo] = useState({
        issueTitle: "",
        issueContent: " ",
        userId: "",
        typeId: "",
    });

    const formRef = useRef();
    const editorRef = useRef();

    const updateInfo = (value, key) => {
        setIssueInfo({
            ...issueInfo,
            [key]: value,
        });
    };

    const addHandle = () => {
        addIssueApi({
            issueTitle: issueInfo.issueTitle,
            issueContent: editorRef.current.getInstance().getHTML(),
            userId: userInfo._id,
            typeId: issueInfo.typeId,
        });
        navigate("/");
        message.success("添加成功，审核通过后将会展示");
        
    }

    const handleChange = (value) => {
        updateInfo(value, "typeId");
    };

    const handleEditorChange = () => {
        const content = editorRef.current.getInstance().getMarkdown();
        updateInfo(content, "issueContent");
    }

    return (
        <div className={styles.container}>
            <Form
                name="basic"
                initialValues={issueInfo}
                autoComplete="off"
                ref={formRef}
                onFinish={addHandle}
            >
                <Form.Item
                    label="标题"
                    name="issueTitle"
                    rules={[{ required: true, message: "请输入标题" }]}
                >
                    <Input
                        placeholder="请输入标题"
                        size="large"
                        value={issueInfo.issueTitle}
                        onChange={(e) =>
                            updateInfo(e.target.value, "issueTitle")
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="问题分类"
                    name="typeId"
                    rules={[{ required: true, message: "请选择问题所属分类" }]}
                >
                    <Select size="large" style={{ width: 200 }} onChange={handleChange}>
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="问题描述"
                    name="issueContent"
                    rules={[{ required: true, message: "请输入问题描述" }]}
                >
                    <Editor
                        initialValue={issueInfo.issueContent}
                        onChange={handleEditorChange}
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        language="zh-CN"
                        ref={editorRef}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        确认新增
                    </Button>

                    <Button type="link" htmlType="reset" className="resetBtn">
                        重置
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
