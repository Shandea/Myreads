import Book from "./Book";

const Bookshelf = ({shelf, collection, onUpdateBook}) => {
  return (
      <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
{
      shelf === "Currently Reading" ? 
      collection.map((book, i) => (
        book.shelf ==="currentlyReading" ? 
        <Book key= {i} book={book} index={i} onUpdateBook={onUpdateBook} />
        : null 
      ))
      :shelf === "Want to Read" ? 
      collection.map((book, i) => (
        book.shelf ==="wantToRead" ? 
        <Book key= {i} book={book} index={i} onUpdateBook={onUpdateBook} />
        : null 
      ))
       :shelf === "Read" ? 
       collection.map((book, i) => (
         book.shelf ==="read" ? 
         <Book key= {i} book={book} index={i} onUpdateBook={onUpdateBook} />
         : null 
       ))
       :null
}
       </ol> 
       </div>
       </div>
    // // <ol>
    //   {/* {props.books.map((book) => (
    //     <li key={book.id}>
    //       <Book book = {book} />
    //     </li>
    //   ))}
    // </ol> */}
  
  );

};

export default Bookshelf;