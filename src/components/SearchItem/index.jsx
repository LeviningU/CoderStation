import React from "react";

import IssueItem from "../IssueItem";

export default function SearchItem(props) {
    return <div>
        {props.info.issueTitle ? 
            <IssueItem issueInfo={props.info} />
            :
            <div>{props.info}</div>
        }
    </div>;
}
