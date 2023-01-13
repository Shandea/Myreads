const Book = ({ book, index, onUpdateBook }) => {
  console.log(book.shelf ==="currentlyReading")
  return (
    <li key={index}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select  onChange={(e) => onUpdateBook(e, book)}>
              <option value="None" selected={!book.shelf}>
                None
              </option>
              <option value="currentlyReading" selected={book.shelf ==="currentlyReading"}>
                Currently Reading
              </option>
              <option value="wantToRead" selected={book.shelf ==="wantToRead"}>
                Want To Read
              </option>
              <option value="read" selected={book.shelf ==="read"}>
                Read
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors?.map((author, i) => {
            if (i === book.authors.length - 1) {
              return `${author}`;
            } else {
              return `${author},`;
            }
          })}
        </div>
      </div>
    </li>
  );

};

export default Book;
