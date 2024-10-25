import React from "react";

import IssueItem from "../IssueItem";
import BookItem from "../BookItem";

export default function SearchItem(props) {
    return <div>
        {props.info.issueTitle ? 
            <IssueItem issueInfo={props.info} />
            :
            <BookItem bookInfo={props.info} type="search" />
        }
    </div>;
}
