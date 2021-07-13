import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import useAuth from '../hooks/useAuth';

export default function EditReview(prop) {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const labels = {
    0: 'Useless',
    1: 'Useless+',
    2: 'Poor+',
    3: 'Ok+',
    4: 'Good+',
    5: 'Excellent+',
  };

  const {
    content, score, reviewId, onEdit, bookId,
  } = prop;
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');

  const initialValues = {
    content,
    score,
  };

  const handleSubmit = async (values, actions) => {
    const formData = new FormData();
    formData.append('content', values.content);
    formData.append('score', values.score);
    const requestOptions = {
      method: 'PATCH',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
      body: formData,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${bookId}/reviews/${reviewId}`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      const review = await response.json();
      onEdit(review.data);
      actions.resetForm({ values: initialValues });
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <Formik enableReinitialize onSubmit={handleSubmit} initialValues={initialValues}>
        {({
          setFieldValue, values,
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
                    placeholder="Add your review..."
                    className="textarea"
                  />
                </p>
              </div>
              <div className="field">
                <Rating
                  name="score"
                  precision={1}
                  value={values.score}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    setFieldValue('score', newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                />
                {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
              </div>
              <div className="field">
                <p className="control">
                  <button className="button" id="CreateReview" type="submit">Edit Review</button>
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
