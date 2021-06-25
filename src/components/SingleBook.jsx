import React from 'react';
import { Link } from 'react-router-dom';

export default function SingleBook( props ) {
  const { bookId, title, img } = props.book;
  return (
    <li className="SingleBook">
      <h3><Link to={`/books/${bookId}`}>{title}</Link></h3>
      <img class="image" alt="book" src={img} />
    </li>
  );
}
