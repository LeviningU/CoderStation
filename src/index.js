import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "antd/dist/reset.css";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <ConfigProvider locale={zhCN}>
                    <App />
                </ConfigProvider>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);
