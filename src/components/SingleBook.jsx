import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import OptionBook from './OptionsBook';

export default function SingleBook(prop) {
  const { book } = prop;
  const {
    id, title, isbn, author, genre, imageUrl, description,
  } = book;

  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <div className="SingleBook">
      <div className="card">
        <div className="card-image">
          <img className="book-image" alt="book" src={imageUrl || 'https://res.cloudinary.com/dhlmiijdd/image/upload/v1625949914/book_jdcwha.jpg'} />
        </div>
        <div className="card-content">
          <div className="media">
            <h3><Link to={`/books/${id}`} className="subtitle is-3 has-text-grey-light">{title}</Link></h3>
          </div>
          <p><b>{genre}</b></p>
          <p>{author}</p>
          <br />
          {location.pathname.includes(`books/${id}`) ? (
            <div className="content">

              {description}
              <br />
              <p>
                <b>ISBN:</b>
                {' '}
                {isbn}
              </p>
              <a href="/HumbertoAmaElResponsive">#Humberto Ama El Responsive</a>
              <br />
              {currentUser ? (
                <p>
                  {' '}
                  {'Book uploaded by '}
                  <OptionBook key={book.id} book={book} />
                  {' '}
                  <br />
                </p>
              ) : ''}
            </div>
          ) : '' }
        </div>
      </div>

    </div>
  );
}
