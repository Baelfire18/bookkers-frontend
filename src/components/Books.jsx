import React from 'react';
import SingleBook from './SingleBook';
import '../styles/books.css';

function Books() {
  const bookArray = [
    {
      bookId: 1,
      title: 'Percy Jackson: The lightning thief',
      img: 'https://images.cdn2.buscalibre.com/fit-in/360x360/b8/86/b886a5ec056f6eea24f542dde45f11ef.jpg',
    },
    {
      bookId: 2,
      title: 'Libro 2',
      img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/classic-novel-kindle-book-cover-design-template-59f47ff5c79cbd1d5fa0c14e585217eb_screen.jpg?ts=1561444051',

    },
    {
      bookId: 3,
      title: 'Libro 3',
      img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/contemporary-fiction-night-time-book-cover-design-template-1be47835c3058eb42211574e0c4ed8bf_screen.jpg?ts=1594616847',
    },
    {
      bookId: 4,
      title: 'Libro 4',
      img: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/thriller-fantasy-book-cover-castle-mountain-design-template-890a4e62a2009241b05e70a59186240d_screen.jpg?ts=1599683486',
    },

  ];
  return (
    <div className="Books">
      <div className="Title">
        <h1>GudReads Libros</h1>
      </div>

      <ul className="BookList">
        {bookArray.map((book) => (
          <SingleBook key={book.bookId} book={book} />
        ))}
      </ul>
    </div>
  );
}

export default Books;