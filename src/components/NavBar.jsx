import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from "@react-icons/all-files/fa/FaUserAlt";
import { FaPowerOff } from "@react-icons/all-files/fa/FaPowerOff";

export default function NavBar( ) {
    return (
        <nav className="navbar is-dark">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src="https://img.icons8.com/emoji/452/orange-book.png" className="d-inline-block align-top" alt="\"></img>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-brand navbar-menu">
                    <div className="navbar-end">
                        <Link to="/" className="navbar-item">Home</Link>
                        <Link to="/authors/1" className="navbar-item">MyProfile</Link>
                        <Link to="/books" className="navbar-item">Books</Link>
                        <a className="navbar-item" href="/chileNecesitaAJoseAntonioKast">
                            <img src="https://cdn.pixabay.com/photo/2013/07/12/17/50/bookmark-152545_960_720.png" width="40" height="80" className="d-inline-block align-top" alt="\"></img>
                        </a>
    
                        {/* <?php if ($_SESSION['name']): ?> */}
                            <div className=" navbar-menu navbar-item has-dropdown is-hoverable">
                                <p className="navbar-link">
                                    Humberto Oltuzar
                                    <div className="navbar-dropdown">
                                        <Link to="/authors/1" className="navbar-item">Profile - <FaUserAlt /></Link>
                                        <Link to="/wenlo420" className="navbar-item">Log Out - <FaPowerOff /></Link>
                                    </div>
                                </p>
                            </div>
    
                        {/* <?php else: ?> */}
                            <Link to="/auth" className="navbar-item">Login</Link>
                            <a className="navbar-item" href="/~grupo18/register.php">Registrarme</a>
                        {/* <?php endif ?> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}