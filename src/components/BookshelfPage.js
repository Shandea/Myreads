import "../App.css";
import { useState, useEffect } from "react";
import Bookshelf from "./Bookshelf";
import * as BookAPI from "../BooksAPI";
import SearchPage from "./SearchPage";
import { Link } from "react-router-dom"

function BookshelfPage() {
    const [showSearchPage, setShowSearchpage] = useState(false);
    // const [searchResults, setSearchResults] = useState([]);
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

  return (
    <div className="app">
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
            <Link to="/search">
              {/* onClick={() => setShowSearchpage(!showSearchPage)}> */}
              <a>Add a book</a>
            </Link>
            </div>
          </div>
        </div>
    </div>
  );
}

export default BookshelfPage;