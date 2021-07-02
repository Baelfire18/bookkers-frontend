import React from 'react';
import { Link } from 'react-router-dom';

export default function SingleBook(prop) {
  const { book } = prop;
  const { bookId, title, img } = book;
  return (
    <div className="SingleBook">
      {/* <h3><Link to={`/books/${bookId}`} className="subtitle is-3 has-text-grey-light">
      {title}</Link></h3> */}
      {/* <img className="book-image" alt="book" src={img} /> */}
      <div className="card">
        <div className="card-image">
          <img className="book-image" alt="book" src={img} />
        </div>
        <div className="card-content">
          <div className="media">
            <h3><Link to={`/books/${bookId}`} className="subtitle is-3 has-text-grey-light">{title}</Link></h3>
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Phasellus nec iaculis mauris.
            <br />
            <a href="/HumbertoAmaElResponsive">#Humberto Ama El Responsive</a>
            <br />
            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>

    </div>
  );
}
