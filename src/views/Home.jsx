import React from 'react';

export default function Home() {
  return (
    <div>
      <h1 className="title">Welcome to Bookers</h1>
      {/* <div>
        <ul><Link to="/authors">Authors</Link></ul>
        <ul><Link to="/books">Books</Link></ul>
      </div> */}
      <div className="buttons">
        <button className="button is-primary" type="submit">Primary</button>
        <button className="button is-link" type="submit">Link</button>
      </div>

      <div className="buttons">
        <button className="button is-info" type="submit">Info</button>
        <button className="button is-success" type="submit">Success</button>
        <button className="button is-warning" type="submit">Warning</button>
        <button className="button is-danger" type="submit">Danger</button>
      </div>
    </div>
  );
}
