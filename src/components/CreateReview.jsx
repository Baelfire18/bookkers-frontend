import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function CreateReview({ onAdd }) {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');

  const initialValues = {
    content: '',
    score: 5,
  };

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('content', values.content);
    formData.append('score', values.score);
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
      body: formData,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}/reviews`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const review = await response.json();
      onAdd(review.data);
      actions.resetForm({ values: initialValues });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <Formik enableReinitialize onSubmit={handleSubmit} initialValues={initialValues}>
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
                  placeholder="Add your review..."
                  className="textarea"
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button" id="CreateReview" type="submit">Post Review</button>
              </p>
            </div>
          </div>
        </Form>

      </Formik>
      <p>{message}</p>
    </>
  );
}
