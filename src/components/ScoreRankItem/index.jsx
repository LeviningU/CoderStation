import React from "react";

import styles from "./ScoreRankItem.module.css";

import { Avatar } from "antd";

export default function ScoreRankItem(props) {

    let rank = props.rank
    switch(props.rank) {
        case 1:
            rank = <span style={{color: '#ffda23', fontSize: '22px'}} className="iconfont rank"></span>;
            break;
        case 2:
            rank = <span style={{color: '#c5c5c5', fontSize: '22px'}} className="iconfont rank"></span>;
            break;
        case 3:
            rank = <span style={{color: '#cd9a62', fontSize: '22px'}} className="iconfont rank"></span>;
            break;
        default:
            break;
    }
    return <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.rank}>
                {rank}
            </div>
            <div className={styles.avatar}>
                <Avatar size="small" src={props.rankInfo.avatar}></Avatar>
            </div>
            <div className={styles.nickname}>{props.rankInfo.nickname}</div>
        </div>
        <div className={styles.right}>{props.rankInfo.points}</div>
    </div>;
}
