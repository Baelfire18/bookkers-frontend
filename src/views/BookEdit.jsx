import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';
import BookForm from '../components/BookForm';

export default function BookEdit() {
  const { id } = useParams();

  const [book, setBook] = useState([]);

  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
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
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, bookData) => setBook(bookData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (!currentUser) {
    return (<Redirect to="/login" />);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="hero Books is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <BookForm initialValues={book} method="PATCH" id={id} />
          </div>
        </div>
      </div>
    </section>
  );
}
