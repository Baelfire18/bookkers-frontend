import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/error.css';

export default function NotFound() {
  return (
    <body className="cacu error404">
      <header className="cacu top-header" />

      <div>
        <div className="cacu starsec" />
        <div className="cacu starthird" />
        <div className="cacu starfourth" />
        <div className="cacu starfifth" />
      </div>

      <div className="cacu lamp__wrap">
        <div className="cacu lamp">
          <div className="cacu cable" />
          <div className="cacu cover" />
          <div className="cacu in-cover">
            <div className="cacu bulb" />
          </div>
          <div className="cacu light" />
        </div>
      </div>

      <section className="cacu error">
        <div className="cacu error__content">
          <div className="cacu error__message">
            <h1 className="cacu message__title">Page Not Found</h1>
            <p className="cacu message__text">We are sorry, the page you were looking for is not found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
          </div>
          <div className="cacu error__nav e-nav">
            <Link to="/" className="cacu e-nav__link" />
          </div>
        </div>
      </section>
    </body>
  );
}
