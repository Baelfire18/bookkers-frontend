import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth';

export default function CreateReport(prop) {
  const { currentUser } = useAuth();

  const { bookId, reviewId, onSend } = prop;

  const [message, setMessage] = useState('');

  const initialValues = {
    content: '',
  };

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('content', values.content);
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
      body: formData,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${bookId}/reviews/${reviewId}/reports`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      actions.resetForm({ values: initialValues });
      onSend();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          content: Yup.string()
            .max(1024, 'The content must be 1024 characters or less')
            .required('This field is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({
          errors, touched,
        }) => (
          <Form className="media">
            <figure className="media-left">
              <p className="image is-64x64">
                <img src={currentUser.imageUrl} alt="/" />
              </p>
            </figure>
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <Field
                    type="text"
                    name="content"
                    placeholder="Add your report..."
                    className="textarea"
                  />
                  {errors.content && touched.content ? (
                    <div>{errors.content}</div>
                  ) : null}
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button" id="CreateReport" type="submit">Send Report</button>
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <p>{message}</p>
    </>
  );
}
