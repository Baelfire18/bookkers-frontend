import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Books from './BookList';
import bookArray from '../seeds/books';

export default function BookDetail() {
  const { id } = useParams();
  const { bookId, title, img } = bookArray[id-1];

  return (
    <div className="Books" heigh="80%">
        <div className="SingleBook">
          <h3 className="subtitle is-3 has-text-grey-light"> {title} </h3>
          
          <div class="columns">
            <div class="column">
              <img className="book-image" alt="book" src={img} />
            </div>
            <div class="column">
              <p> Chupala Cacu ql, llegaste tarde</p>
              <button className="button is-info">Info</button>
              <button className="button is-success">Success</button>
              <button className="button is-warning">Warning</button>
              <button className="button is-danger">Danger</button>
            </div>
          </div>
        </div>
    </div>
  );
}