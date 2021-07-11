import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { FaRegEnvelope } from '@react-icons/all-files/fa/FaRegEnvelope';
import { AiFillLock } from '@react-icons/all-files/ai/AiFillLock';
import { FcCheckmark } from '@react-icons/all-files/fc/FcCheckmark';
import useAuth from '../hooks/useAuth';

const initialValues = {
  email: '',
  password: '',
};

export default function LogIn() {
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();

  const handleSubmit = async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const user = await response.json();
      handleUserLogin(user);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = function handleChange(event) {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (currentUser) return <Redirect to="/" />;

  return (
    <section className="hero is-success is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
              <form onSubmit={handleSubmit} className="box">

                <div className="field">
                  <label htmlFor="email" className="label">Email</label>
                  <div className="control has-icons-left  has-icons-right">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={values.email}
                      placeholder="example@domain.com"
                      className="input"
                      onChange={handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <FaRegEnvelope />
                    </span>
                    <span className="icon is-small is-right">
                      <FcCheckmark />
                    </span>

                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={values.password}
                      placeholder="*******"
                      className="input"
                      onChange={handleChange}
                      required
                    />
                    <span className="icon is-small is-left">
                      <AiFillLock />
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <div className="field">
                  <button className="button is-success" type="submit" disabled={!(values.email && values.password)}>
                    Login
                  </button>
                </div>
              </form>
              <p>{errorMessage}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
