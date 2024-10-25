import React from "react";

import styles from "./BookItem.module.css";

import { Card } from "antd";

import { useNavigate } from "react-router-dom";

import { formatTime } from "../../utils/tools";

function searchType(props, navigate) {
    return (
        <div className={styles.container}>
            <div className={styles.bookNum}>
                <div>{props.bookInfo.commentNumber}</div>
                <div>回答</div>
            </div>
            <div className={styles.bookNum}>
                <div>{props.bookInfo.scanNumber}</div>
                <div>浏览</div>
            </div>
            <div className={styles.bookContainer}>
                <div className={styles.left}>
                    <img src={props.bookInfo.bookPic} alt="" className={styles.bookPic} />
                </div>
                <div className={styles.right}>
                    <div style={{cursor: "pointer"}} className={styles.top} onClick={() => {navigate(`/books/${props.bookInfo._id}`)}} >
                        {props.bookInfo.bookTitle}
                    </div>
                    <div>
                        {formatTime(+props.bookInfo.onShelfDate, "year")}
                    </div>
                </div>
            </div>
        </div>
    )
}

function normalType(props, navigate) {
    return (
        <Card
            hoverable
            className={styles.bookDesc}
            style={{ width: 210, padding: 10, marginTop: 10 }}
            cover={
                <img
                    alt="book"
                    style={{ height: 240, objectFit: "cover" }}
                    src={props.bookInfo.bookPic}
                />
            }
        >
            <Card.Meta
                onClick={() => {navigate(`/books/${props.bookInfo._id}`)}}
                title={props.bookInfo.bookTitle}
                description={<div style={{display: "flex", justifyContent: "space-between"}}>
                    <span>浏览数：{props.bookInfo.scanNumber}</span>
                    <span>评论数：{props.bookInfo.commentNumber}</span>
                </div>}
            />
        </Card>
    );
}

export default function BookItem(props) {
    const navigate = useNavigate();

    if (props.type === "search") {
        return searchType(props, navigate);
    } else {
        return normalType(props, navigate);
    }
}
