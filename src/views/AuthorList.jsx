import React from 'react';
import { Link } from 'react-router-dom';

export default function AuthorList() {
  const authors = [
    { id: 1 },
    { id: 2 },
  ];

  return (
    <div>
      <Link to="/">Home</Link>
      <h2>Authors</h2>
      {authors.map(({ id }) => <div key={id}><Link to={`/authors/${id}`}>{`Author ${id}`}</Link></div>)}
    </div>
  );
}
