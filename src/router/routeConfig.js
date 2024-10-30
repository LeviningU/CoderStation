import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interview from "../pages/Interview";
import AddIssue from "../pages/AddIssue";
import IssueDetail from "../pages/IssueDetail"
import SearchPage from "../pages/SearchPage";
import BookDetail from "../pages/BookDetail";
import Personal from "../pages/Personal";

import { Navigate } from "react-router-dom";

const config = [
    {
        path: "/",
        element: <Navigate to="issues" />,
        needLogin: false,
    },
    {
        path: "/issues",
        element: <Issues />,
        needLogin: false,
    },
    {
        path: "/addissue",
        element: <AddIssue />,
        needLogin: true,
    },
    {
        path: "/issues/:id",
        element: <IssueDetail />,
        needLogin: false,
    },
    {
        path: "/books",
        element: <Books />,
        needLogin: false,
    },
    {
        path: "/books/:id",
        element: <BookDetail />,
        needLogin: false,
    },
    {
        path: "/interviews",
        element: <Interview />,
        needLogin: false,
    },
    {
        path: "/searchPage",
        element: <SearchPage />,
        needLogin: false,
    },
    {
        path: "/personal",
        element: <Personal />,
        needLogin: true,
    },
    {
        path: "*",
        element: <h1>404</h1>,
        needLogin: false,
    }

]

export default config;