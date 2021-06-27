import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from '@react-icons/all-files/fa/FaUserAlt';
import { FaPowerOff } from '@react-icons/all-files/fa/FaPowerOff';

export default function NavBar() {
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
            <Link to="/authors/1" className="navbar-item">MyProfile</Link>
            <Link to="/books" className="navbar-item">Books</Link>
            <a className="navbar-item" href="/chileNecesitaAJoseAntonioKast">
              <img src="https://cdn.pixabay.com/photo/2013/07/12/17/50/bookmark-152545_960_720.png" width="40" height="80" className="d-inline-block align-top" alt="\" />
            </a>

            {/* <?php if ($_SESSION['name']): ?> */}
            <div className="navbar-item has-dropdown is-hoverable">
              <p className="navbar-link">
                Humberto Ortuzar
                <div className="navbar-dropdown">
                  <Link to="/authors/1" className="navbar-item" onClick={(event) => { event.target.blur(); }}>
                    Profile
                    {' '}
                    {' '}
                    <FaUserAlt />
                  </Link>
                  <Link to="/wenlo420" className="navbar-item" onClick={(event) => { event.target.blur(); }}>
                    Log Out
                    {' '}
                    {' '}
                    <FaPowerOff />
                  </Link>
                </div>
              </p>
            </div>

            {/* <?php else: ?> */}
            <Link to="/login" className="navbar-item">Login</Link>
            <a className="navbar-item" href="/~grupo18/register.php">Registrarme</a>
            {/* <?php endif ?> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
