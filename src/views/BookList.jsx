import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import SingleBook from '../components/SingleBook';
import '../styles/books.css';
import { BsSearch } from '@react-icons/all-files/bs/BsSearch';

function Books() {
  const [values, setValues] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [count, setCount] = useState(0);
  // const limit = 4;

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
        // setCount(limit + count);
      });
  }, []);

  const handleBooks1 = async () => {
    // setCount( count + limit );
    console.log(values.fragment);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/books?fragment=${values.fragment}`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    const booksArray = await response.json();
    new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(booksArray, (_error, booksData) => setBooks(booksData));

    // setCount( count + limit );
  };
  // const handleBooks2 = async () => {
  //   console.log(count);
  //   const response = await fetch(`${process.env.REACT_APP_API_URL}/books?limit=${limit}&&origin=${count}`);
  //   if (!response.ok) {
  //     const error = await response.text();
  //     throw new Error(error);
  //   }
  //   const booksArray = await response.json();
  //   new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(booksArray, (_error, booksData) => setBooks(booksData));

  //   // setCount( count - limit );
  // };

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
          {/* <button onClick={ () => {
                  setCount( count - limit );
                  handleBooks2();
                } }>{`<`}</button>
          <button onClick={ () => {
                  setCount( count + limit );
                  handleBooks1();
                } }>{`>`}</button>
          < br />
          <a>{count}</a> */}

          <article className="panel is-success">
            <div className="panel-block">
              <p className="control has-icons-left">
                <form onSubmit={handleBooks1}>
                  <input
                    className="input is-success"
                    type="text"
                    placeholder="Search"
                    value={values.fragment}
                  />
                  <span className="icon is-left">
                    <BsSearch />
                  </span>
                </form>
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
