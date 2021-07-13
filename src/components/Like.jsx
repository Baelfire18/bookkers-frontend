import React, { useState, useEffect } from 'react';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

export default function Like(prop) {
  const { review } = prop;

  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/books/${review.bookId}/reviews/${review.reviewId}/likes`)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, bookData) => setBook(bookData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);


  return (
    <>
      <a>
        <FcLike />
        {' '}
        Like
        {' '}
      </a>
    </>
  );
}
