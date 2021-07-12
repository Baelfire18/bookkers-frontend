import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import SingleReview from './SingleReview';
import CreateReview from './CreateReview';
import useAuth from '../hooks/useAuth';

export default function Review() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { currentUser, handleUserLogout } = useAuth();


  const handleAddReview = (review, completed = false) => {
    setReviews((prevReviews) => [
      ...prevReviews,
      {
        id: review["attributes"].id,
        content: review["attributes"].content,
        score: review["attributes"].score,
        userId: review["attributes"].userId,
        bookId: review["attributes"].bookId,
      }
    ]);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/books/${id}/reviews`)
      .then((response) => {
        if (response.status !== 200 && response.status !== 204) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        if (data.length != 0) {
          new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, reviewsData) => setReviews(reviewsData));
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (!currentUser) {
    return (<h2>Log in to see the reviews</h2>)
  }

  return (
    <section className="section is-small">
      <div className="card">
        <div className="card-content">
          {error ? (
            <h2>
              There are no reviews yet for this book :(
              {error}
            </h2>
          ) : (
            <>
              {reviews.map((review) => (
                <SingleReview key={review.id} review={review} />
              ))}
            </>
          )}
          <CreateReview onAdd={handleAddReview}/>
        </div>
      </div>
    </section>
  );
}
