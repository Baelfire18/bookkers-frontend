import React, { useState, useEffect } from 'react';
import { BsPencil } from '@react-icons/all-files/bs/BsPencil';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { Deserializer } from 'jsonapi-serializer';
import Rating from '@material-ui/lab/Rating';
import SingleReport from './SingleReport';
import useAuth from '../hooks/useAuth';
import Like from './Like';
import EditReview from './EditReview';

export default function SingleReview(prop) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const { review, onRemove } = prop;

  const [error, setError] = useState('');
  const [content, setContent] = useState(review.content);
  const [score, setScore] = useState(review.score);
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState(false);

  const {
    id, bookId, userId,
  } = review;

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleOnEdit = (updatedReview) => {
    setContent(updatedReview.attributes.content);
    setScore(updatedReview.attributes.score);
    setEdit(!edit);
  };

  const handleDelete = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${bookId}/reviews/${id}`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      onRemove(id);
    } catch (error) {
      error;
    }
  };

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/${review.userId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, userData) => setUser(userData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {!edit ? (
        <article className="media">
          <div className="rows">
            <div className="row is-full">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={user.imageUrl} alt="/" />
                </p>
              </figure>
            </div>
            { currentUser.id === review.userId ? (
              <div className="row is-full">
                <button className="button is-info is-small" type="submit" onClick={handleEdit}><BsPencil /></button>
                <button className="button is-danger is-small" type="submit" onClick={handleDelete}><FaTrash /></button>
              </div>
            )
              : ''}
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong id={`${id}`}>
                  {user.firstName}
                  {' '}
                  {user.lastName}
                </strong>
                <br />
                {content}
                <br />
                <small>
                  <p>
                    <Rating
                      name="size-small"
                      readOnly
                      value={score}
                    />
                  </p>
                </small>
                <br />
                <small>
                  <Like review={review} />
                  {' '}
                  ·
                  {' '}
                  <a href="#AunNoLaHacemos">Report</a>
                  {' '}
                  · 7 days
                </small>
              </p>
            </div>
            {/* <SingleReport /> */}
          </div>
        </article>
      ) : (
        <>
          {/* <button className="button is-info" type="submit" onClick={handleEdit}><BsPencil /></button> */}
          <EditReview content={content} score={score} reviewId={id} onEdit={handleOnEdit} bookId={bookId} />
        </>
      )}
    </>
  );
}
