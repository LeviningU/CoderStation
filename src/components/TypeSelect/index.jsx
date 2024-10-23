import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getTypeList, setBookType, setIssueType } from "../../redux/typeSlice";

import { Tag } from "antd";
import { typeColor } from "../../utils/constant";

export default function TypeSelect(props) {

    const { typeList } = useSelector((state) => state.type);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList());
        }

        // eslint-disable-next-line
    }, [typeList]);

    const handleSelect = (typeId) => {
        if (props.type === "issue") {
            dispatch(setIssueType(typeId));
        }
        else if (props.type === "book") {
            dispatch(setBookType(typeId));
        }
    }

    const typeOptions = typeList.map((item, index) => {
        return <Tag 
            key={item._id} 
            color={typeColor[index % typeColor.length]}
            value={item._id}
            style={{cursor: "pointer"}}
            onClick={() => {handleSelect(item._id)}}
        >{item.typeName}</Tag>;
    });


    return <div>
        <Tag 
            key="all" 
            color="magenta"
            value="all"
            onClick={() => {handleSelect("all")}}
            style={{cursor: "pointer"}}
        >全部</Tag>
        {typeOptions}
    </div>;
}
