import React from 'react';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import SingleReport from './SingleReport';

export default function SingleComment() {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="/" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong id="Bastian Hilcker">Bastian Hilcker</strong>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Duis porta eros lacus, nec ultricies elit blandit non.
            Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
            <br />
            <small>
              <a href="#Bastian Hilcker">
                4
                {' '}
                <FcLike />
                {' '}
                Like
                {' '}
              </a>
              {' '}
              ·
              {' '}
              <a>Report</a>
              {' '}
              · 7 days
            </small>
          </p>
        </div>
        <SingleReport />
      </div>
    </article>
  );
}
