import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interview from "../pages/Interview";

import { Routes, Route, Navigate } from "react-router-dom";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="issues" />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/books" element={<Books />} />
            <Route path="/interviews" element={<Interview />} />
            <Route path="*" element={<h1>404</h1>} />
        </Routes>
    );
}