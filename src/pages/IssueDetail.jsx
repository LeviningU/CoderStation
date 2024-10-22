import React from "react";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getIssueByIdApi, updateIssueApi } from "../api/issue"
import { getUserByIdApi } from "../api/user";

import styles from "./IssueDetail.module.css"

import PageHeader from "../components/PageHeader"
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import Discuss from "../components/Discuss";

import { Avatar } from "antd";
import { formatTime } from "../utils/tools";

export default function IssueDetail() {

    const { id } = useParams();
    const [issueInfo, setIssueInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getIssueByIdApi(id).then((data) => {
            setIssueInfo(data.data);
            getUserByIdApi(data.data.userId).then((data) => {
                setUserInfo(data.data);
            })
        })
    }, [id, refresh])

    return <div className={styles.container}>
        <PageHeader title="问答详情"></PageHeader>
        <div className={styles.detailContainer}>
            <div className={styles.leftSide}>
                <div className={styles.question}>
                    <h1>{issueInfo.issueTitle}</h1>
                    <div className={styles.questioner}>
                        <Avatar size="small" src={userInfo.avatar} />
                        <span className={styles.user}>{userInfo.nickname}</span>
                        <span>发布于：{formatTime(+issueInfo.issueDate, "year")}</span>
                    </div>
                    <div className={styles.content}>
                        <div dangerouslySetInnerHTML={{__html: issueInfo.issueContent}}></div>
                    </div>
                    <Discuss
                        commentType="issue"
                        id={id}
                        typeId={issueInfo.typeId}
                        onSubmit={() => {
                            updateIssueApi(id, {
                                commentNumber: issueInfo.commentNumber + 1
                            }).then(() => {
                                setRefresh(!refresh);
                            })
                        }}
                    ></Discuss>

                </div>
            </div>
            <div className={styles.rightSide}>
                <div style={{marginBottom: 20}}>
                    <Recommend />
                </div>
                <div style={{marginBottom: 20}}>
                    <ScoreRank />
                </div>
            </div>
        </div>
    </div>;
}
