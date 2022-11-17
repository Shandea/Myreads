import "./App.css";
import { useState, useEffect } from "react";
import Bookshelf from "./components/Bookshelf";
import Book from "./components/Book";
import * as BookAPI from "../src/BooksAPI";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [booksCollection, setBooksCollection] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await BookAPI.getAll();

      setBooksCollection(res);
    };

    getBooks();
    return () => {
      console.log("cleanup");
    };
  }, []);

  const updateBookShelf = async (e, book) => {
    console.log("hi");
    await BookAPI.update(book, e.target.value);
    const res = await BookAPI.getAll();

    setBooksCollection(res);

    e.target.value = "";
  };

  const updateSearch = async (e) => {
    // const handleChange = (e) => {
    //   setSearchResults(e.target.value);
    //   if (e.target.value === "") {
    //     setSearchResults(false);
    //   } else {
    //     setSearchResults(true);
    //   }
    // };
    console.log(e.target.value);
    const res = await BookAPI.search(e.target.value, 3);
    console.log(res);

    setSearchResults(res);
  };



  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
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
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Bookshelf
                shelf={"Currently Reading"}
                collection={booksCollection}
                onUpdateBook={updateBookShelf}
              />
              <Bookshelf
                shelf={"Want to Read"}
                collection={booksCollection}
                onUpdateBook={updateBookShelf}
              />
              <Bookshelf
                shelf={"Read"}
                collection={booksCollection}
                onUpdateBook={updateBookShelf}
              />
            </div>
            <div className="open-search">
              <a onClick={() => setShowSearchpage(!showSearchPage)}>
                Add a book
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
