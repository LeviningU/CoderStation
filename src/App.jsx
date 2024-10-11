import { Layout } from "antd";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";

import Router from "./router";

import "./App.css";

const { Header, Content, Footer } = Layout;

function App() {
    return <div className="App">
        <Layout>
            <Header className="header">
                <NavHeader />
            </Header>
            <Content className="content">
                <Router></Router>
            </Content>
            <Footer className="footer">
                <PageFooter />
            </Footer>
        </Layout>
    </div>;
}

export default App;
