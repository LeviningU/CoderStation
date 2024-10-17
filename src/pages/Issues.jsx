import React from "react";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import IssueItem from "../components/IssueItem";
import AddIssueBtn from "../components/AddIssueBtn";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";

import styles from "./Issues.module.css";

import { Pagination } from "antd";

import { getIssueByPageApi } from "../api/issue";

export default function Issues() {

    const [issueInfo, setIssueInfo] = useState([]);
    const [pageInfo, setPageInfo] = useState({ 
        current: 1,
        pageSize: 15
    });
    const [total, setTotal] = useState(0);

    const handleChange = (page, pageSize) => {
        setPageInfo({
            current: page,
            pageSize: pageSize
        });
    }

    useEffect(() => {
        getIssueByPageApi({
            current: pageInfo.current,
            pageSize: pageInfo.pageSize,
            issueStatus: true,
        }).then(({data}) => {
            setIssueInfo(data.data);
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage
            });
            setTotal(data.count);
        });
        // eslint-disable-next-line
    }, [pageInfo.current, pageInfo.pageSize]);

    const issueList = issueInfo.map((item) => {
        return <IssueItem key={item._id} issueInfo={item} />;
    });

    return <div className={styles.container}>
        <PageHeader title="问答列表" />
        <div className={styles.issueContainer}>
            <div className={styles.leftSide}>
                {issueList}
                <div className="paginationContainer">
                    <Pagination 
                        showQuickJumper 
                        showSizeChanger
                        pageSizeOptions={["5", "10", "15"]}
                        pageSize={pageInfo.pageSize}
                        current={pageInfo.current}
                        total={total} 
                        onChange={handleChange} />
                </div>
            </div>
            <div className={styles.rightSide}>
                <AddIssueBtn />
                <div style={{marginBottom: "30px"}}>
                    <Recommend />
                </div>
                <ScoreRank />
            </div>
        </div>
    </div>;
}
