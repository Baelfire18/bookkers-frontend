import React, { useState, useEffect } from 'react';
import { AiFillStar } from '@react-icons/all-files/ai/AiFillStar';
import { Deserializer } from 'jsonapi-serializer';
import SingleReport from './SingleReport';
import useAuth from '../hooks/useAuth';
import Like from './Like';

export default function SingleReview(prop) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

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
      <div className="media-content">
        <div className="content">
          <p>
            <strong>
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
              <Like />
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
