import React from 'react';
import SingleBook from '../components/SingleBook';
import bookArray from '../seeds/books';
import '../styles/books.css';

function Books() {
  return (
    <div className="Books">
      <div className="Title">
        <h1>Books</h1>
      </div>

      <ul className="BookList">
        {bookArray.map((book) => (
          <SingleBook key={book.bookId} book={book} />
        ))}
      </ul>
    </div>
  );
}

export default Books;
