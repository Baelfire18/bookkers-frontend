import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { GiUnicorn } from '@react-icons/all-files/gi/GiUnicorn';
import { AiFillBook } from '@react-icons/all-files/ai/AiFillBook';
import { FiUpload } from '@react-icons/all-files/fi/FiUpload';
import { BsCode } from '@react-icons/all-files/bs/BsCode';
import { BsFillPersonFill } from '@react-icons/all-files/bs/BsFillPersonFill';
import useAuth from '../hooks/useAuth';

export default function BookForm(prop) {
  const {
    initialValues, method, id, buttonText,
  } = prop;

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { currentUser } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="column is-5-tablet is-4-desktop is-3-widescreen">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          title: Yup.string()
            .min(2, 'The title must be at least 2 characters')
            .max(50, 'The title must be 50 characters or less')
            .required('This field is required'),
          isbn: Yup.string()
            .min(10, 'The ISBN must be at least 10 characters')
            .max(13, 'The ISBN must be 13 characters or less')
            .required('This field is required'),
          author: Yup.string()
            .min(2, 'The author must be at least 2 characters')
            .max(50, 'The author must be 50 characters or less')
            .required('This field is required'),
          genre: Yup.string()
            .min(2, 'The genre must be at least 6 characters')
            .max(50, 'The genre must be 30 characters or less')
            .required('This field is required'),
          description: Yup.string()
            .max(1024, 'The description must be 1024 characters or less'),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('isbn', values.isbn);
          formData.append('author', values.author);
          formData.append('genre', values.genre);
          formData.append('description', values.description);
          formData.append('image', values.file);
          const requestOptions = {
            method,
            headers: new Headers({
              Accept: 'application/json',
              Authorization: `Bearer ${currentUser.access_token}`,
            }),
            body: formData,
          };
          try {
            let response;

            if (method === 'POST') {
              response = await fetch(`${process.env.REACT_APP_API_URL}/books`, requestOptions);
            } else {
              response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, requestOptions);
            }
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            const thisNewBook = await response.json();
            setMessage('Books has been sucesesfully created');
            history.push(`/books/${thisNewBook.data.id}`);
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
              <label htmlFor="Title" className="label">
                Title
                <div className="control has-icons-left">
                  <Field type="text" name="title" placeholder="Title" className="input" />
                  {errors.title && touched.title ? (
                    <div>{errors.title}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <AiFillBook />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label className="label" htmlFor="isbn">
                ISBN
                <div className="control has-icons-left">
                  <Field className="input" name="isbn" type="number" placeholder="9786124497001" />
                  {errors.isbn && touched.isbn ? (
                    <div>{errors.isbn}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <BsCode />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label className="label" htmlFor="author">
                Author
                <div className="control has-icons-left">
                  <Field className="input" name="author" type="text" placeholder="Bastian Hilcker" />
                  {errors.author && touched.author ? (
                    <div>{errors.author}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <BsFillPersonFill />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="genre" className="label">
                Genre
                <div className="control has-icons-left">
                  <Field type="text" name="genre" className="input" placeholder="Fantasy" />
                  {errors.genre && touched.genre ? (
                    <div>{errors.genre}</div>
                  ) : null}
                  <span className="icon is-small is-left">
                    <GiUnicorn />
                  </span>
                </div>
              </label>
            </div>

            <div className="field">
              <label htmlFor="description" className="label">
                Description
                <div className="control">
                  <Field type="text" name="description" className="textarea" placeholder="Noice" />
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                </div>
              </label>
            </div>

            <Field type="hidden" name="userId" className="input" />

            <div className="file">
              <label className="file-label" htmlFor="upload-file">
                <input
                  className="file-input"
                  id="upload-file"
                  type="file"
                  name="resume"
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
