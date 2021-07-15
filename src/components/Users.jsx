import React, { useState, useEffect } from 'react';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';
import SingleUser from './SingleUser';

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (<h2>Log in to see all the users</h2>);
  }

  const handleRemoveUser = (userId) => {
    const newUsers = users.filter((user) => user.id !== userId);
    setUsers(newUsers);
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
    fetch(`${process.env.REACT_APP_API_URL}/users`, requestOptions)
      .then((response) => {
        if (response.status !== 200 && response.status !== 204) {
          setError(true);
          return {};
        }
        return response.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(data, (_error, usersData) => setUsers(usersData));
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    <h2>Loading, please wait...</h2>;
  }

  return (
    <section className="section is-small">
      <div className="card">
        <div className="card-content">
          {error ? (
            <h2>
              There are no users for this book :(
              {error}
            </h2>
          ) : (
            <>
              {users.map((user) => (
                <SingleUser key={user.id} user={user} onRemove={handleRemoveUser} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
