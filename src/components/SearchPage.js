import "../App.css";
import { useState, useEffect } from "react";
import Bookshelf from "./Bookshelf";
import Book from "./Book";
import * as BookAPI from "../BooksAPI";
import { Link } from "react-router-dom"

function SearchPage() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const updateBookShelf = async (e, book) => {
    console.log("hi");
    await BookAPI.update(book, e.target.value);
    console.log(book);
    const updatedSearchBooks = searchResults.map((searchResult) => {
      if (searchResult.id === book.id) {
        return {
          ...searchResult,
          shelf: e.target.value,
        };
      }

      return searchResult;
    });

    setSearchResults(updatedSearchBooks);

    e.target.value = "";

    // updating search so it stays on shelf after seletced in drop down
  };

  const updateSearch = async (e) => {
    console.log(e.target.value);
    if (!e.target.value) {
      setSearchResults([]);
    } else {
      const res = await BookAPI.search(e.target.value, 3);
      res.forEach((item) => {
        if (item.imageLinks === undefined) item["imageLinks"] = "";
      });
      if (res.error) setSearchResults([]);
      else setSearchResults(res);
    }
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
            <Link to="/">
          <a
            className="close-search"
            onClick={() => setShowSearchpage(!showSearchPage)}
          >
            Close
          </a>
          </ Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={updateSearch}
              type="text"
              placeholder="Search by title, author, or ISBN"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book, i) => (
              <Book
                key={i}
                book={book}
                index={i}
                onUpdateBook={updateBookShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
