import React from "react";
import { useEffect, useState } from "react";

import { Card } from "antd";
import  ScoreRankItem from "../ScoreRankItem";

import { getScoreRankApi } from "../../api/user";

export default function ScoreRank() {

    const [rankInfo, setRankInfo] = useState([]);

    useEffect(() => {
        getScoreRankApi().then((res) => {
            setRankInfo(res.data);
        });
    }, []);

    const rankList = rankInfo.map((item, index) => {
        return <ScoreRankItem key={item._id} rankInfo={item} rank={index + 1} />;
    });

    return <Card title="积分排行榜">
        {rankList}
    </Card>;
}
