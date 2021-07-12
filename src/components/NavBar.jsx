import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt';
import { FaPowerOff } from '@react-icons/all-files/fa/FaPowerOff';
import useAuth from '../hooks/useAuth';

export default function NavBar() {
  const { currentUser, handleUserLogout } = useAuth();
  const [isActive, setisActive] = React.useState(false);

  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="https://img.icons8.com/emoji/452/orange-book.png" className="d-inline-block align-top" alt="\" />
          </a>
          <div onClick={() => { setisActive(!isActive); }} onKeyDown={() => { setisActive(!isActive); }} role="button" tabIndex="0" className={`navbar-burger navbar-dropdown ${isActive ? 'is-active' : ''}`} data-target="navMenuColorblack-example">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div id="navMenuColorblack-example" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link to="/" className="navbar-item">Home</Link>
            <Link to="/users/1" className="navbar-item">MyProfile</Link>
            <Link to="/books" className="navbar-item">Books</Link>
            <a href="https://github.com/IIC2513-2021-1/grupo-demaciagang-p2-frontend" target="_blanck" className="navbar-item"> About Us</a>
            <a className="navbar-item" href="/chileNecesitaAJoseAntonioKast">
              <img src="https://cdn.pixabay.com/photo/2013/07/12/17/50/bookmark-152545_960_720.png" width="40" height="80" className="d-inline-block align-top" alt="\" />
            </a>

            { currentUser ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <p className="navbar-link">
                  {currentUser.firstName}
                  <div className="navbar-dropdown">
                    <Link to="/users/1" className="navbar-item" onClick={(event) => { event.target.blur(); }}>
                      Profile
                      {' '}
                      {' '}
                      <FaUserAlt />
                    </Link>
                    <a className="navbar-item" type="button" onClick={handleUserLogout}>
                      Log Out
                      {' '}
                      {' '}
                      <FaPowerOff />
                    </a>
                  </div>
                </p>
              </div>

            ) : (
              <>
                <Link to="/login" className="navbar-item">Log In</Link>
                <Link to="/signup" className="navbar-item">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
