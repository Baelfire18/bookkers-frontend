import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import SingleBook from '../components/SingleBook';
import Review from '../components/Review';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/books/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.json();
      })
      // .then(setBook)
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, bookData) => setBook(bookData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="Books" heigh="80%">
      {error ? (
        <h2>
          Something went wrong, please try again later
          {error}
        </h2>
      ) : (
        <div>
          <SingleBook key={book.bookId} book={book} />
          <div className="container is-max-desktop">
            <Review />
          </div>
        </div>
      )}
    </div>
  );
}
