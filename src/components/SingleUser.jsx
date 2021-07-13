import React, { useState } from 'react';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import useAuth from '../hooks/useAuth';

export default function SingleUser(prop) {
  const { user, onRemove } = prop;

  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  const {
    id, firstName, lastName,
  } = user;

  const handleDelete = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${currentUser.access_token}`,
      }),
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/users/${id}`, requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      onRemove(id);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      {!error ? (
        <article className="media">
          <div className="rows">
            <div className="row is-full">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src={user.imageUrl} alt="/" />
                </p>
              </figure>
            </div>
            { currentUser.admin && parseInt(currentUser.id) !== parseInt(id) ? (
              <div className="row is-full">
                <button className="button is-danger is-small" type="submit" onClick={handleDelete}><FaTrash /></button>
              </div>
            )
              : ''}
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong id={`${id}`}>
                  {firstName}
                  {' '}
                  {lastName}
                </strong>
              </p>
            </div>
            {/* <SingleReport /> */}
          </div>
        </article>
      ) : (
        <>
          {error.text}
        </>
      )}
    </>
  );
}
