import React, { useState, useEffect } from 'react';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { Deserializer } from 'jsonapi-serializer';
import SingleReport from './SingleReport';
import useAuth from '../hooks/useAuth';

export default function SingleReview(prop) {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const { currentUser, handleUserLogout } = useAuth();

  const { review } = prop;
  const {
    content, score, reviewId, bookId, userId,
  } = review;

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
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={user.imageUrl} alt="/" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong id={`${reviewId}`}>{user.firstName} {user.lastName}</strong>
            <br />
            {content}
            <br />
            <small>
              <a href={`#${reviewId}`}>
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
    </article>
  );
}
