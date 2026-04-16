import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthUI from "./Login";
import Layout from "./layout/Layout.jsx";
import Apps from "./pages/Admin/apps";
import BookDetails from "./pages/BookDetails.jsx";
import AddBook from "./pages/AddBook.jsx";
import IssueBook from "./pages/IssueBook.jsx";
import Members from "./pages/Members.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages with NavBar */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/issue-book" element={<IssueBook />} />
          <Route path="/members" element={<Members />} />
          <Route path="/analysis" element={<Apps />} />
        </Route>

        {/* Login page without NavBar */}
        <Route path="/login" element={<AuthUI />} />
      </Routes>
    </Router>
  );
}

export default App;
