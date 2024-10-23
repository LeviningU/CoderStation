import React from "react";
import styles from "./index.module.css";

export default function PageHeader(props) {
    return <div className={styles.row}>
        <div className={styles.pageHeader}>
            {props.title}
        </div>
        <div>
            {props.children}
        </div>
    </div>;
}
