import React from "react";
import { useState, useEffect } from "react";

import PageHeader from "../components/PageHeader";
import AddIssueBtn from "../components/AddIssueBtn";
import Recommend from "../components/Recommend";
import ScoreRank from "../components/ScoreRank";
import SearchItem from "../components/SearchItem";

import { Pagination } from "antd";

import { useLocation } from "react-router-dom";

import styles from "./SearchPage.module.css";

import { getIssueByPageApi } from "../api/issue";
import { getBookByPageApi } from "../api/book";

export default function SearchPage() {
    const { state } = useLocation();

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

    const [searchInfo, setsearchInfo] = useState([]);

    useEffect(() => {
        const searchParam = {
            current: pageInfo.current,
            pageSize: pageInfo.pageSize,
            issueStatus: true,
        }

        
        if (state.searchOption === "issue") {
            searchParam.issueTitle = state.value;
            getIssueByPageApi(searchParam).then(({data}) => {
                setsearchInfo(data.data);
                setPageInfo({
                    current: data.currentPage,
                    pageSize: data.eachPage
                });
                setTotal(data.count);
            });
        }
        else {
            searchParam.bookTitle = state.value;
            getBookByPageApi(searchParam).then(({data}) => {
                setsearchInfo(data.data);
                setPageInfo({
                    current: data.currentPage,
                    pageSize: data.eachPage
                });
                setTotal(data.count);
            });
        }
        // eslint-disable-next-line
    }, [pageInfo.current, pageInfo.pageSize, state.value, state.searchOption]);


    const searchList = searchInfo.map((item) => {
        return <SearchItem key={item._id} info={item} />;
    });

    return <div className="container">
        <PageHeader title="搜索结果" />
        <div className={styles.searchPageContainer}>
            <div className={styles.leftSide}>
                {
                    searchInfo.length === 0 ? 
                    <div className={styles.noResult}>有问题，就来CoderStation</div> : 
                    <>
                        {searchList}
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
                    </>
                }
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
