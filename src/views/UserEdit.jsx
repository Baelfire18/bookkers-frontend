import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';
import UserForm from '../components/UserForm';

export default function UserEdit() {
  const [user, setUser] = useState([]);

  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/users/me`)
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

  if (!currentUser) {
    return (<Redirect to="/login" />);
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="hero Books is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <UserForm initialValues={user} method="PATCH" id={currentUser.id} buttonText="Edit Profile" />
          </div>
        </div>
      </div>
    </section>
  );
}
