import React from 'react';
import { Link } from 'react-router-dom';
import SingleBook from '../components/SingleBook';
import bookArray from '../seeds/books';
import '../styles/books.css';

function Books() {
  return (
    <div>
      <Link to="/">Home</Link>
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
    </div>
  );
}

export default Books;
