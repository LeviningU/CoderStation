import React from "react";
import { useEffect, useState } from "react";

import styles from "./BookDetail.module.css";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateUserInfoAsync } from "../redux/userSlice";

import { getBookByIdApi, updateBookApi } from "../api/book";

import PageHeader from "../components/PageHeader";
import Discuss from "../components/Discuss";

import { message } from "antd";

export default function BookDetail() {
    const { id } = useParams();

    const [book, setBook] = useState({});
    const [refresh, setRefresh] = useState(false);
    const { user, isLogin } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        getBookByIdApi(id).then(({ data }) => {
            setBook(data);
        });
    }, [id, refresh]);

    function download() {
        if (!isLogin) {
            message.warning("请先登录");
            return;
        }
        if (user.points < book.requirePoints) {
            message.warning("积分不足");
            return
        }
        dispatch(updateUserInfoAsync({
            userId: user._id,
            newInfo: {
                points: user.points - book.requirePoints
            }
        }))
        window.open(book.downloadLink);
    }

    return <>
        <PageHeader title="书籍详情" />
        <div className={styles.bookInfoContainer}>
            <div className={styles.leftSide}>
                <div className={styles.img}>
                    <img style={{height: 350, objectFit: "cover"}} src={book.bookPic} alt={book.bookTitle} />
                </div>
                <div className={styles.link}>
                    下载所需积分：
                    <span className={styles.requirePoints} >{book.requirePoints}</span>
                    分
                </div>
                {
                    isLogin ? 
                    <div className={styles.link}>
                        您的积分：
                        <span className={styles.userPoints}>{user.points}</span>
                        分
                    </div> : undefined
                }
                <div className={styles.link}>
                    {
                        isLogin ? 
                        <div className={styles.downloadLink} onClick={download}>百度云下载地址</div> : 
                        <div className={styles.downloadLink} onClick={download}>登录后查看下载地址</div>
                    }
                </div>
                
            </div>
            <div className={styles.rightSide}>
                <h1 className={styles.title}>{book.bookTitle}</h1>
                <div dangerouslySetInnerHTML={{__html: book.bookIntro}}></div>
            </div>
        </div>
        <div className={styles.comment}>
            <Discuss
                commentType="book"
                id={id}
                typeId={book.typeId}
                onSubmit={() => {
                    updateBookApi(id, {
                        commentNumber: book.commentNumber + 1
                    }).then(() => {
                        setRefresh(!refresh);
                    })
                }}
            ></Discuss>
        </div>
    </>
}
