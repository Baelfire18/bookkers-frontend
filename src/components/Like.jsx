import React, { useState, useEffect } from 'react';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { FcDislike } from '@react-icons/all-files/fc/FcDislike';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

export default function Like(prop) {
  const { review } = prop;

  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [error, setError] = useState(false);
  const [like, setLike] = useState([]);

  const DeleteLike = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${review.bookId}/reviews/${review.id}/likes`, requestOptions);
      if (!response.ok) {
        const error2 = await response.text();
        setError(true);
        throw new Error(error2);
      }
      setLike([]);
    } catch (error2) {
      setMessage(error2.message);
    }
  };

  const CreateLike = async () => {
    const requestOptions = {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${review.bookId}/reviews/${review.id}/likes`, requestOptions);
      if (!response.ok) {
        const error2 = await response.text();
        setError(true);
        throw new Error(error2);
      }
      setLike(['noLeasEstoHumberto']);
    } catch (error2) {
      setMessage(error2.message);
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
    fetch(`${process.env.REACT_APP_API_URL}/books/${review.bookId}/reviews/${review.id}/${currentUser.id}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, likeData) => setLike(likeData));
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {' '}
      {like.length !== 0 ? (
        <button onClick={DeleteLike} id="DeleteLike" type="submit">
          <FcDislike />
          {' '}
          DisLike
          {' '}
        </button>
      )
        : (
          <button onClick={CreateLike} id="CreateLike" type="submit">
            <FcLike />
            {' '}
            Like
            {' '}
          </button>
        )}
    </>
  );
}
