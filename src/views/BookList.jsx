import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import SingleBook from '../components/SingleBook';
import '../styles/books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/books`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, booksData) => setBooks(booksData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="Books">
      {error ? (
        <h2>Something went wrong, please try again later</h2>
      ) : (
        <div>
          <div className="Title">
            <h1>Books</h1>
          </div>
          <Link className="button is-success" to="/books/new">Create New Book</Link>
          <ul className="BookList">
            {books.map((book) => (
              <SingleBook key={book.id} book={book} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Books;
