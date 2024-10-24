import React from "react";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTypeList } from "../../redux/typeSlice";

import styles from "./index.module.css";

import { formatTime } from "../../utils/tools";

import { Tag } from "antd";
import { typeColor } from "../../utils/constant";

import { getUserByIdApi } from "../../api/user";

import { useNavigate } from "react-router-dom";

export default function IssueItem(props) {

    const { typeList } = useSelector((state) => state.type);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        }
        // eslint-disable-next-line
    }, [typeList]);

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserByIdApi(props.issueInfo.userId).then((res) => {
            setUserInfo(res.data);
        });
    }, [props.issueInfo.userId]);

    const type = typeList.find((item) => item._id === props.issueInfo.typeId);
    const index = typeList.indexOf(type);

    const navigate = useNavigate();

    return <div className={styles.container}>
        <div className={styles.issueNum}>
            <div>{props.issueInfo.commentNumber}</div>
            <div>回答</div>
        </div>
        <div className={styles.issueNum}>
            <div>{props.issueInfo.scanNumber}</div>
            <div>浏览</div>
        </div>
        <div className={styles.issueContainer}>
            <div className={styles.top} onClick={() => {navigate(`/issues/${props.issueInfo._id}`)}}>{props.issueInfo.issueTitle}</div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <Tag color={typeColor[index % typeColor.length]}>{type?.typeName}</Tag>
                </div>
                <div className={styles.right}>
                    <Tag color="volcano">{userInfo?.nickname}</Tag>
                    <span>{formatTime(+props.issueInfo.issueDate, "year")}</span>
                </div>
            </div>
        </div>
    </div>;
}
