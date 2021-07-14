import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Deserializer } from 'jsonapi-serializer';
import SingleBook from '../components/SingleBook';
import MyReview from '../components/MyReview';
import MyLikedReviews from '../components/MyLikedReviews';
import useAuth from '../hooks/useAuth';

export default function User() {
  const [myBooks, setMyBooks] = useState(false);
  const [myReviews, setMyReviews] = useState(false);
  const [myLikedReviews, setMyLikedReviews] = useState(false);

  const [myBooksArray, setMyBooksArray] = useState([]);

  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const requestOptions = {
    method: 'GET',
    headers: new Headers({
      Accept: 'application/json',
      Authorization: `Bearer ${currentUser.access_token}`,
    }),
  };

  const handleMybooks = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/my_books`, requestOptions);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    const booksArray = await response.json();
    new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(booksArray, (_error, booksData) => setMyBooksArray(booksData));

    setMyBooks(true);
    setMyReviews(false);
    setMyLikedReviews(false);
  };

  const handleMyReviews = async () => {
    setMyBooks(false);
    setMyReviews(true);
    setMyLikedReviews(false);
  };

  const handleMyLikedReviews = () => {
    setMyBooks(false);
    setMyReviews(false);
    setMyLikedReviews(true);
  };

  return (
    <section>
      <div className="columns">
        <div className="container profile">
          <div className="section profile-heading">
            <div className="columns is-mobile is-multiline">
              <div className="column is-2">
                <span className="header-icon user-profile-image">
                  <img alt="" src={currentUser.imageUrl} />
                </span>
              </div>
              <div className="column is-4-tablet is-10-mobile name">
                <p>
                  <span className="title is-bold">
                    {currentUser.firstName}
                    {' '}
                    {currentUser.lastName}
                  </span>
                  <br />
                  {/* Se conecta acá */}
                  {/* <a className="button is-primary is-outlined" href="#userBook" id="edit-preferences">
                    Edit Preferences
                  </a> */}
                  <Link
                    to="/users/me/edit"
                    className="button is-primary"
                    id="Edituser"
                  >
                    Edit Profile
                  </Link>
                  <br />
                </p>
                <p className="tagline">
                  The users profile bio would go here, of course.
                  It could be two lines or more or whatever.
                  We should probably limit the amount of characters to ~500 at most though.
                  {currentUser.email}
                </p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">30</p>
                <p className="stat-key">searches</p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">10</p>
                <p className="stat-key">likes</p>
              </div>
              <div className="column is-2-tablet is-4-mobile has-text-centered">
                <p className="stat-val">{currentUser.id}</p>
                <p className="stat-key">lists</p>
              </div>
            </div>
          </div>
          <div className="profile-options is-fullwidth">
            <div className="tabs is-fullwidth is-medium">
              <ul>

                <li className={myReviews ? 'link is-active' : 'link'}>
                  <a>
                    <span onClick={handleMyReviews}>My Reviews</span>
                  </a>
                </li>

                <li className={myBooks ? 'link is-active' : 'link'}>
                  <a>
                    <span onClick={handleMybooks}>My Books</span>
                  </a>
                </li>

                <li className={myLikedReviews ? 'link is-active' : 'link'}>
                  <a>
                    <span onClick={handleMyLikedReviews}>My Liked Reviews</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <br />
          {myBooks ? (
            <ul className="BookList" id="userBook">
              {myBooksArray.map((book) => (
                <SingleBook key={book.id} book={book} />
              ))}
            </ul>
          ) : ((myReviews) ? (

            <MyReview />

          ) : ((myLikedReviews) ? (
            <MyLikedReviews />
          ) : ''
          ))}

        </div>
      </div>
    </section>

  );
}
