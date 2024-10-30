import React from "react";
import { useRef, useEffect, useState } from "react";

import styles from "./Discuss.module.css";

import { Avatar, Form, Button, List, Tooltip, message, Pagination } from "antd";
import { Comment } from '@ant-design/compatible';
import { UserOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { updateUserInfoAsync } from "../../redux/userSlice";

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { getIssueCommentByIdApi, getBookCommentByIdApi, addCommentApi } from "../../api/comment";
import { getUserByIdApi } from "../../api/user";

import { formatTime } from "../../utils/tools";

export default function Discuss(props) {

    const isLogin = useSelector((state) => state.user.isLogin);
    const userInfo = useSelector((state) => state.user.user);
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 2
    });
    const [total, setTotal] = useState(0);
    const [commentList, setCommentList] = useState([]);
    const editorRef = useRef(null);

    const [refresh, setRefresh] = useState(false);

    const dispatch = useDispatch();

    const handleChange = (page, pageSize) => {
        setPageInfo({
            current: page,
            pageSize: pageSize
        });
    }

    useEffect(() => {
        if (props.commentType === "issue" && props.id && pageInfo.current && pageInfo.pageSize) {    
            getIssueCommentByIdApi(props.id, {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize
            }).then(async ({data}) => {
                setTotal(data.count);
                data.data.map(async (item) => {
                    const res = await getUserByIdApi(item.userId)
                    item.userInfo = res.data;
                    return item;
                });
                setCommentList(data.data);
            })
        }
        else if (props.commentType === "book" && props.id && pageInfo.current && pageInfo.pageSize) {
            getBookCommentByIdApi(props.id, {
                current: pageInfo.current,
                pageSize: pageInfo.pageSize
            }).then(async ({data}) => {
                setTotal(data.count);
                data.data.map(async (item) => {
                    const res = await getUserByIdApi(item.userId)
                    item.userInfo = res.data;
                    return item;
                });
                setCommentList(data.data);
            })
        }
        // eslint-disable-next-line
    }, [props.commentType, props.id, pageInfo.current, pageInfo.pageSize, refresh])

    let avatar = null;
    if (isLogin) {
        avatar = <Avatar src={userInfo.avatar} />
    }
    else {
        avatar = <Avatar icon={<UserOutlined />} />
    }

    const handleComment = () => {
        const content = editorRef.current.getInstance().getMarkdown();
        if (content.trim() === "") {
            message.warning("评论内容不能为空");
            return;
        }
        if (props.commentType === "issue") {
            addCommentApi({
                commentContent: editorRef.current.getInstance().getHTML(),
                typeId: props.typeId,
                issueId: props.id,
                bookId: null,
                userId: userInfo._id,
                commentType: 1
            }).then(() => {
                message.success("评论成功，积分+4");
                editorRef.current.getInstance().setMarkdown(" ");
                setRefresh(!refresh);
                props.onSubmit && props.onSubmit();
                dispatch(updateUserInfoAsync({
                    userId: userInfo._id,
                    newInfo: {
                        points: userInfo.points + 4
                    }
                }))
            })
        }
        else if (props.commentType === "book") {
            addCommentApi({
                commentContent: editorRef.current.getInstance().getHTML(),
                typeId: props.typeId,
                issueId: null,
                bookId: props.id,
                userId: userInfo._id,
                commentType: 2
            }).then(() => {
                message.success("评论成功，积分+4");
                editorRef.current.getInstance().setMarkdown(" ");
                setRefresh(!refresh);
                props.onSubmit && props.onSubmit();
                dispatch(updateUserInfoAsync({
                    userId: userInfo._id,
                    newInfo: {
                        points: userInfo.points + 4
                    }
                }))
            })
        }
    }

    return <div>
        <Comment
            avatar={ avatar }
            content={
                <>
                    <Form.Item>
                        <Editor
                            initialValue=" "
                            previewStyle="vertical"
                            height="270px"
                            initialEditType="wysiwyg"
                            useCommandShortcut={true}
                            language="zh-CN"
                            ref={editorRef}
                            className="editor"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            disabled={!isLogin}
                            onClick={handleComment}
                        >
                            添加评论
                        </Button>
                    </Form.Item>
                </>
            }
        />
        {
            commentList.length === 0 ? <div className={styles.paginationContainer}>暂无评论</div> :
            <>
                <List
                    header="当前评论"
                    dataSource={commentList}
                    renderItem={item => (
                        <Comment
                            author={item.userInfo?.nickname}
                            avatar={<Avatar src={item.userInfo?.avatar}></Avatar>}
                            content={<div dangerouslySetInnerHTML={{__html: item.commentContent}}></div>}
                            datetime={<Tooltip title={formatTime(+item.commentDate, "year")}>
                                <span>{formatTime(+item.commentDate, "year")}</span>
                            </Tooltip>}
                        />
                    )}
                />
                <div className="paginationContainer">
                    <Pagination 
                        pageSize={pageInfo.pageSize}
                        current={pageInfo.current}
                        total={total} 
                        onChange={handleChange} />
                </div>
            </>
        }
        
    </div>;
}
