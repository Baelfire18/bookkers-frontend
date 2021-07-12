import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

export default function OptionBook(prop) {
  const { book } = prop;
  const { id, userId } = book;
  const [user, setUser] = useState([]);
  const { currentUser } = useAuth();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const deleteBook = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/books/${id}`, requestOptions);
      if (!response.ok) {
        const error2 = await response.text();
        setError(true);
        throw new Error(error2);
      }
      history.push('/books');
    } catch (error2) {
      setMessage(error2.message);
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, userData) => setUser(userData));
      })
      .catch(() => setError(true));
  }, []);

  return (
    <>
      {error ? (
        <p>{message}</p>
      ) : (
        <>
          <p>{user.firstName}</p>
          { currentUser.admin ? (
            <div className="field">
              <p className="control">
                <button onClick={deleteBook} className="button is-danger" id="DeleteBook" type="submit">Delete Book</button>
              </p>
            </div>
          ) : (
            <></>
          )}
          { currentUser.admin || currentUser.id === userId ? (
            <div className="field">
              <p className="control">
                <Link
                  to={{
                    pathname: `/books/${id}/edit`,
                    query: {
                      title: book.title,
                      description: book.description,
                      imageUrl: book.imageUrl,
                      genre: book.genre,
                      author: book.author,
                      isbn: book.isbn,
                    },
                  }}
                  className="button is-primary"
                  id="EditBook"
                >
                  Edit Book
                </Link>
              </p>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
