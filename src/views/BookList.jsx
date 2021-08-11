import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';
import { Deserializer } from 'jsonapi-serializer';
import SingleBook from '../components/SingleBook';
import '../styles/books.css';

function Books() {
  const initialValues = {
    genre: '',
  };
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
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleBooks1 = async (values) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/books?fragment=${values.genre}`);
    const booksArray = await response.json();
    new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(booksArray, (_error, booksData) => setBooks(booksData));
  };

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
          <br />
          <article className="columns is-centered panel is-success">
            <div className="column panel-block is-three-fifths auto">
              <p className="control has-icons-left">
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  onSubmit={handleBooks1}
                >
                  {({
                    errors, touched,
                  }) => (
                    <Form>
                      <article className="panel is-success">
                        <div className="panel-block">
                          <p className="control has-icons-left">
                            <Field
                              type="text"
                              name="genre"
                              placeholder="Add a valid genre"
                              className="input is-success"
                            />
                            {errors.content && touched.content ? (
                              <div>{errors.content}</div>
                            ) : null}
                            <span className="icon is-small is-left">
                              <BsSearch />
                            </span>
                          </p>
                        </div>
                      </article>
                      <div className="field">
                        <p className="control">
                          <button className="button" id="CreateReview" type="submit">Search Genre</button>
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </p>
            </div>
          </article>

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
