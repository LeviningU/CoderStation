import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interview from "../pages/Interview";
import AddIssue from "../pages/AddIssue";
import IssueDetail from "../pages/IssueDetail"

import { Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="issues" />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/addissue" element={<AddIssue />}></Route>
            <Route path="/issues/:id" element={<IssueDetail />}></Route>
            <Route path="/books" element={<Books />} />
            <Route path="/interviews" element={<Interview />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}