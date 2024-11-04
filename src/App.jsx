import { Layout } from "antd";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import LoginForm from "./components/LoginForm";

// import Router from "./router";
import RouterBefore from "./router/RouterBefore";

import { useState, useEffect } from "react";

import { getInfoApi, getUserByIdApi } from "./api/user";
import { login } from "./redux/userSlice";
import { useDispatch } from "react-redux";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {

    const [isModalShow, setIsModalShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getInfoApi().then(res => {
                if (res.data) {
                    getUserByIdApi(res.data._id).then(res => {
                        dispatch(login(res.data));
                    });
                }
                else {
                    localStorage.removeItem("token");
                }
            });
        }
    }, [dispatch]);

    const handleClick = () => {
        setIsModalShow(true);
    }

    const handleCancel = () => {
        setIsModalShow(false);
    }

    return <div className="App">
        <Layout 
            style={{ overflowX: "hidden" }}
        >
            <Header className="header">
                <NavHeader onClick={handleClick} />
            </Header>
            <Content className="content">
                <RouterBefore></RouterBefore>
            </Content>
            <Footer className="footer">
                <PageFooter />
            </Footer>
        </Layout>
        <LoginForm isModalShow={isModalShow} onClose={handleCancel} />
    </div>;
}

export default App;
