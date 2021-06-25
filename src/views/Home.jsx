import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to Bookers</h1>
      <div>
        <ul><Link to="/authors">Authors</Link></ul>
        <ul><Link to="/books">Books</Link></ul>
      </div>
    </div>
  );
}