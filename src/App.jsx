import { Layout } from "antd";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import LoginForm from "./components/LoginForm";

import Router from "./router";

import { useState } from "react";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {

    const [isModalShow, setIsModalShow] = useState(false);

    const handleClick = () => {
        setIsModalShow(true);
    }

    const handleCancel = () => {
        setIsModalShow(false);
    }

    return <div className="App">
        <Layout>
            <Header className="header">
                <NavHeader onClick={handleClick} />
            </Header>
            <Content className="content">
                <Router></Router>
            </Content>
            <Footer className="footer">
                <PageFooter />
            </Footer>
        </Layout>
        <LoginForm isModalShow={isModalShow} onClose={handleCancel} />
    </div>;
}

export default App;
