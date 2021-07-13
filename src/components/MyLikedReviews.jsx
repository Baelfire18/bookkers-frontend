import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import SingleReview from './SingleReview';
import useAuth from '../hooks/useAuth';

export default function MyLikedReviews() {
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useAuth();

  if (!currentUser) {
    return (<h2>Log in to see the reviews</h2>);
  }

  const handleRemoveReview = (reviewId) => {
    const newReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(newReviews);
    if (newReviews.length === 0) setError(true);
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
    fetch(`${process.env.REACT_APP_API_URL}/users/${currentUser.id}/liked_reviews`, requestOptions)
      .then((response) => {
        if (response.status !== 200 && response.status !== 204) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, reviewsData) => setReviews(reviewsData));
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    <h2>Loading...</h2>;
  }

  return (
    <section className="section is-small">
      <div className="card">
        <div className="card-content">
          {error ? (
            <h2>
              This user does not have any reviews!
              {error}
            </h2>
          ) : (
            <>
              {reviews.map((review) => (
                <SingleReview key={review.id} review={review} onRemove={handleRemoveReview} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
