import React from "react";
import { useEffect } from "react";
import styles from "./index.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getTypeList } from "../../redux/typeSlice";

import { Tag } from "antd";
import { typeColor } from "../../utils/constant";

export default function PageHeader(props) {

    const { typeList } = useSelector((state) => state.type);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        }
        // eslint-disable-next-line
    }, [typeList]);

    const typeOptions = typeList.map((item, index) => {
        return <Tag key={item._id} color={typeColor[index % typeColor.length]}>{item.typeName}</Tag>;
    });

    return <div className={styles.row}>
        <div className={styles.pageHeader}>
            {props.title}
        </div>
        <div>
            {typeOptions}
        </div>
    </div>;
}
