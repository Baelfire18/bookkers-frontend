import React from 'react';

export default function Home() {
  return (
    <div>
      <h1  className="title">Welcome to Bookers</h1>
      {/* <div>
        <ul><Link to="/authors">Authors</Link></ul>
        <ul><Link to="/books">Books</Link></ul>
      </div> */}
      <div className="buttons">
        <button className="button is-primary">Primary</button>
        <button className="button is-link">Link</button>
      </div>

      <div className="buttons">
        <button className="button is-info">Info</button>
        <button className="button is-success">Success</button>
        <button className="button is-warning">Warning</button>
        <button className="button is-danger">Danger</button>
      </div>
    </div>
  );
}