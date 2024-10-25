import React from "react";
import { useState, useEffect } from "react"

import styles from "./Books.module.css";

import PageHeader from "../components/PageHeader";
import TypeSelect from "../components/TypeSelect";
import BookItem from "../components/BookItem";

import { Pagination } from "antd";

import { getBookByPageApi } from "../api/book";

import { useSelector } from "react-redux";


export default function Books() {

    const [bookInfo, setBookInfo] = useState([])

    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 15
    })
    const [total, setTotal] = useState(0)
    const [reset, setReset] = useState(false);

    const { issueType } = useSelector((state) => state.type);

    const handleChange = (page, pageSize) => {
        setPageInfo({
            current: page,
            pageSize: pageSize
        });
    }

    useEffect(() => {
        setPageInfo({
            current: 1,
            pageSize: 15
        });
        setReset(!reset);
        // eslint-disable-next-line
    }, [issueType]);

    useEffect(() => {
        const searchParam = {
            current: pageInfo.current,
            pageSize: pageInfo.pageSize
        }

        if (issueType !== "all") {
            searchParam.typeId = issueType
        }
        
        getBookByPageApi(searchParam).then(({data}) => {
            setBookInfo(data.data)
            setPageInfo({
                current: data.currentPage,
                pageSize: data.eachPage
            });
            setTotal(data.count)
        })
        // eslint-disable-next-line
    }, [pageInfo.current, pageInfo.pageSize, reset])

    const bookList = bookInfo.map((item) => {
        return <BookItem key={item._id} bookInfo={item} />;
    });

    return (
        <div className="container">
            <PageHeader title="书籍列表">
                <TypeSelect type="issue" />
            </PageHeader>
            <div className={styles.bookContainer}>
                {bookInfo.length === 0 ? (
                    <div className={styles.noBook}>
                        该分类下暂无书籍
                    </div>
                ) : (
                    <>
                        {bookList}
                        <div className="paginationContainer">
                            <Pagination
                                showQuickJumper
                                showSizeChanger
                                pageSizeOptions={["5", "10", "15"]}
                                pageSize={pageInfo.pageSize}
                                current={pageInfo.current}
                                total={total}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
