import React from "react";

import styles from "./PersonalInfoItem.module.css";

export default function PersonalInfoItem(props) {
    return (
        <div>
            <div className={styles.infoContainer}>
                <div className={styles.left}>
                    <div>{props.label}：</div>
                    <div>{props.value}</div>
                </div>
            </div>
            {props.append}
        </div>
    );
}
