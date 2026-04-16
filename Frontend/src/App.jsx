import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthUI from "./Login";
import Layout from "./layout/Layout.jsx";
import Apps from "../src/pages/Admin/apps";

import BookDetails from "./pages/BookDetails.jsx";
import AddBook from "./pages/AddBook.jsx";
import IssueBook from "./pages/IssueBook.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes that contain NavBar layout */}
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/issue-book" element={<IssueBook />} />
          <Route path="/analysis" element={<Apps />} />
        </Route>
        
        {/* Specific /dashboard and /login don't use layout or have their own */}
        <Route path="/dashboard" element={<Apps/>} />
        <Route path="/login" element={<AuthUI/>} />
      </Routes>
    </Router>
  );
}

export default App;
