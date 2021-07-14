import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import BookForm from '../components/BookForm';

export default function BookNew() {
  const { currentUser } = useAuth();
  const initialValues = {
    title: '',
    isbn: '',
    author: '',
    genre: '',
    description: '',
    imageUrl: '',
  };

  if (!currentUser) return <Redirect to="/login" />;

  return (
    <section className="hero Books is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <BookForm initialValues={initialValues} method="POST" buttonText="New Book" />
          </div>
        </div>
      </div>
    </section>
  );
}
