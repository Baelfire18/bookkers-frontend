import React, { useState, useEffect } from 'react';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { Deserializer } from 'jsonapi-serializer';
import SingleReport from './SingleReport';
import useAuth from '../hooks/useAuth';
import EditReview from './EditReview';

export default function SingleReview(prop) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const { review } = prop;

  const [error, setError] = useState('');
  const [content, setContent] = useState(review.content);
  const [score, setScore] = useState(review.score);
  const { currentUser, handleUserLogout } = useAuth();
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

  const count = [];
  for (let i = 0; i < score; i += 1) {
    count.push(i);
  }

  return (
    <article className="media">

      <figure className="media-left">
        <p className="image is-64x64">
          <img src={user.imageUrl} alt="/" />
        </p>
      </figure>
      {!edit ? (
        <>
          <div className="media-content">
            <button className="button is-info" type="submit" onClick={handleEdit}>Edit</button>
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
                    {count.map(() => (
                      <AiFillStar />
                    ))}
                  </p>
                </small>
                <br />
                <small>
                  <a href={`#${id}`}>
                    {score}
                    {' '}
                    <FcLike />
                    {' '}
                    Like
                    {' '}
                  </a>
                  {' '}
                  ·
                  {' '}
                  <a href="#AunNoLaHacemos">Report</a>
                  {' '}
                  · 7 days
                </small>
              </p>
            </div>
            <SingleReport />
          </div>
        </>
      ) : (
        <>
          <button className="button is-info" type="submit" onClick={handleEdit}>Info</button>
          <EditReview content={content} score={score} reviewId={id} onEdit={handleOnEdit} />
        </>
      )}
    </article>
  );
}
