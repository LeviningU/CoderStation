import Router from ".";

import config from "./routeConfig";

import { Alert } from "antd";

export default function RouterBefore() {
    const path = window.location.pathname.toLowerCase();

    const target = config.find(item => item.path === path);

    const closeHandle = () => {
        window.location.href = "/";
    }

    if (target && target.needLogin) {
        if (!localStorage.getItem("token")) {
            return <Alert
                message="请先登录"
                type="warning"
                closable
                onClose={closeHandle}
                style={{
                    marginTop : "30px",
                    marginBottom : "30px"
                }}
            ></Alert>
        }
    }


    return <Router />;
}