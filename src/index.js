import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "antd/dist/reset.css";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider locale={zhCN}>
                <App />
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);
