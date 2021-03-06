import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FaRegEnvelope } from '@react-icons/all-files/fa/FaRegEnvelope';
import { AiFillLock } from '@react-icons/all-files/ai/AiFillLock';
import { FiUpload } from '@react-icons/all-files/fi/FiUpload';
import { GiClown } from '@react-icons/all-files/gi/GiClown';
import { BsFillPersonFill } from '@react-icons/all-files/bs/BsFillPersonFill';
import useAuth from '../hooks/useAuth';

export default function UserForm(prop) {
  const {
    initialValues, method, buttonText,
  } = prop;

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser, handleUserLogin } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="column is-5-tablet is-4-desktop is-3-widescreen">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .min(3, 'Your name must be at least 3 characters')
            .max(30, 'Your name must be 30 characters or less')
            .required('This field is required'),
          lastName: Yup.string()
            .min(2, 'Your lastname must be at least 2 characters')
            .max(30, 'Your lastname must be 15 characters or less')
            .required('This field is required'),
          email: Yup.string()
            .email('Invalid email')
            .required('This field is required'),
          password: Yup.string()
            .min(6, 'Your password must be at least 6 characters')
            .max(30, 'Your password must be 30 characters or less')
            .required('Password is required'),
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
          acceptedTerms: Yup.boolean()
            .required('Required')
            .oneOf([true], 'Please accept terms and conditions'),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const formData = new FormData();
          const formDataAuth = new FormData();
          formData.append('firstName', values.firstName);
          formData.append('lastName', values.lastName);
          formData.append('email', values.email);
          formData.append('password', values.password);
          formData.append('passwordConfirmation', values.passwordConfirmation);
          formData.append('image', values.file);
          formData.append('acceptedTerms', values.acceptedTerms);
          let requestOptions = {
            method,
            headers: new Headers({
              Accept: 'application/json',
            }),
            body: formData,
          };
          formDataAuth.append('email', values.email);
          formDataAuth.append('password', values.password);
          const requestOptionsAuth = {
            method: 'POST',
            headers: new Headers({
              Accept: 'application/json',
            }),
            body: formDataAuth,
          };
          try {
            let response;

            if (method === 'POST') {
              response = await fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions);
            } else {
              requestOptions = {
                method,
                headers: new Headers({
                  Accept: 'application/json',
                  Authorization: `Bearer ${currentUser.access_token}`,
                }),
                body: formData,
              };
              response = await fetch(`${process.env.REACT_APP_API_URL}/users/${currentUser.id}`, requestOptions);
            }
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('User has been sucesesfully created');
            response = await fetch(`${process.env.REACT_APP_API_URL}/auth`, requestOptionsAuth);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            const user = await response.json();
            handleUserLogin(user);
            history.push('/users/me');
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({
          errors, touched, setFieldValue, values,
        }) => (
          <Form className="box">
            <div className="field">
              <label htmlFor="Email" className="label">
                Email
                <div className="control has-icons-left">
                  <Field type="email" name="email" placeholder="Email" className="input" />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <FaRegEnvelope />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label className="label" htmlFor="firstName">
                First Name
                <div className="control has-icons-left">
                  <Field className="input" name="firstName" type="text" placeholder="Bastian" />
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <GiClown />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label className="label" htmlFor="lastName">
                Last Name
                <div className="control has-icons-left">
                  <Field className="input" name="lastName" type="text" placeholder="Hilcker" />
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <BsFillPersonFill />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="password" className="label">
                Password
                <div className="control has-icons-left">
                  <Field type="password" name="password" className="input" placeholder="*******" />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <AiFillLock />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="passwordConfirmation" className="label">
                Password Confirmation
                <div className="control has-icons-left">
                  <Field type="password" name="passwordConfirmation" className="input" placeholder="*******" />
                  {errors.passwordConfirmation && touched.passwordConfirmation ? (
                    <div>{errors.passwordConfirmation}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <AiFillLock />
                  </span>
                </div>
              </label>
            </div>

            <div className="file">
              <label htmlFor="file" className="file-label">
                <input
                  className="file-input"
                  id="file"
                  type="file"
                  name="file"
                  onChange={(event) => {
                    setFieldValue('file', event.currentTarget.files[0]);
                  }}
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <FiUpload />
                  </span>
                  <span className="file-label">
                    {values.file ? (
                      values.file.name
                    ) : (
                      <>
                        <h2>Choose a file...</h2>
                      </>
                    )}
                  </span>
                </span>
              </label>
            </div>

            <br />

            <div className="field">
              <label className="checkbox" htmlFor="acceptedTerms">
                Accept terms and conditions?
                <Field type="checkbox" name="acceptedTerms" />
                {errors.acceptedTerms && touched.acceptedTerms ? (
                  <div>{errors.acceptedTerms}</div>
                ) : null}
              </label>
            </div>

            <div className="field">
              <button className="button is-success" type="submit">
                {buttonText}
              </button>
            </div>
          </Form>
        )}

      </Formik>
      <p>{message}</p>
    </div>
  );
}
