import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import BookshelfPage from "./components/BookshelfPage";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<BookshelfPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
    // <div className="app">
    //   <BookshelfPage />
    //   <SearchPage />
    // </div>
  );
}

export default App;
