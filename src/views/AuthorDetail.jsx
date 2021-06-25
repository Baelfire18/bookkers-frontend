import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Books from '../components/Books';

export default function AuthorDetail() {
  const { id } = useParams();

  return (
    <div>
      <Link to="/authors">Authors</Link>
      <h2>{`Author ${id}`}</h2>
      <Books />
    </div>
  );
}