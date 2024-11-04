import React from "react";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getInterviewAsync } from "../redux/interviewSlice";
import { getTypeList } from "../redux/typeSlice";

import styles from "./Interview.module.css";

import { Tree, FloatButton } from "antd";
import PageHeader from "../components/PageHeader";

import { getInterviewByIdApi } from "../api/interview";

export default function Interview() {
    const dispatch = useDispatch();
    const interview = useSelector((state) => state.interview.interview);
    const type = useSelector((state) => state.type.typeList);
    const [treeData, setTreeData] = useState([]);
    const [selectInterview, setSelectInterview] = useState(null);

    useEffect(() => {
        if (interview.length === 0) {
            dispatch(getInterviewAsync());
        }
        if (type.length === 0) {
            dispatch(getTypeList());
        }

        if (interview.length > 0 && type.length > 0) {
            const interviewData = type.map((type, index) => {
                return {
                    title: (<h3 style={{fontWeight: 200}}>{type.typeName}</h3>),
                    key: index,
                    children: interview[index].map((item, i) => {
                        return {
                            title: (<h4 onClick={() => {handleSelect(item._id)}} style={{fontWeight: 200}}>{item.interviewTitle}</h4>),
                            key: `${index}-${i}`,
                        }
                    }),
                };
            });
            setTreeData(interviewData);
        }
        // eslint-disable-next-line
    }, [interview.length, type.length]);

    function handleSelect(id) {
        getInterviewByIdApi(id).then((res) => {
            setSelectInterview(res.data);
        });
    }

    let interviewDetail = null;
    if (selectInterview) {
        interviewDetail = (
            <div className={styles.content}>
                <h1 className={styles.interviewRightTitle}>{selectInterview?.interviewTitle}</h1>
                <div className={styles.contentContainer}>
                    <div dangerouslySetInnerHTML={{__html: selectInterview?.interviewContent}}></div>
                </div>
            </div>
        );
    }
    else {
        interviewDetail = (
            <div style={{
                textAlign: "center",
                fontSize: "40px",
                fontWeight: "100",
                marginTop: "150px",
            }}>
                请在左侧选择面试题
            </div>
        );
    }
  
    return <div className={styles.container}>
        <PageHeader title="面试题"></PageHeader>
        <div className={styles.interviewContainer}>
            <div className={styles.leftSide}>
                <Tree
                    treeData={treeData}
                />
            </div>
            <div className={styles.rightSide}>
                {interviewDetail}
            </div>
        </div>
        <FloatButton.BackTop />
    </div>
}
