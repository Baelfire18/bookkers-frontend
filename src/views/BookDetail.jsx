import React from 'react';
import { useParams } from 'react-router-dom';
import bookArray from '../seeds/books';
import SingleBook from '../components/SingleBook';
import Comment from '../components/Comment';

export default function BookDetail() {
  const { id } = useParams();
  // const { bookId, title, img } = bookArray[id - 1];
  const book = bookArray[id - 1];
  return (
    <div className="Books" heigh="80%">
      <SingleBook key={book.bookId} book={book} />
      <div className="container is-max-desktop">
        <Comment />
      </div>
    </div>
  );
}
