import config from "./routeConfig";

// import { Routes, Route, Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";

export default function Router() {

    return useRoutes(config);


//     return (
//         <Routes>
//             <Route path="/" element={<Navigate to="issues" />} />
//             <Route path="/issues" element={<Issues />} />
//             <Route path="/addissue" element={<AddIssue />}></Route>
//             <Route path="/issues/:id" element={<IssueDetail />}></Route>
//             <Route path="/books" element={<Books />} />
//             <Route path="/books/:id" element={<BookDetail />} />
//             <Route path="/interviews" element={<Interview />} />
//             <Route path="/searchPage" element={<SearchPage />} />
//             <Route path="*" element={<h1>404</h1>} />
//         </Routes>
//     );
}