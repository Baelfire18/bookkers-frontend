import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import UserForm from '../components/UserForm';

export default function SignUp() {
  const { currentUser } = useAuth();
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    file: '',
    acceptedTerms: false,
  };

  if (currentUser) return <Redirect to="/" />;

  return (
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <UserForm initialValues={initialValues} method="POST" buttonText="Create account" />
          </div>
        </div>
      </div>
    </section>
  );
}
