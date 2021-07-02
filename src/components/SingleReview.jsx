import React from 'react';
import { FcLike } from '../../node_modules/@react-icons/all-files/fc/FcLike';
import SingleReport from './SingleReport';

export default function SingleReview(prop) {
  const { reviewId } = prop;
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://i.pinimg.com/736x/0c/57/02/0c5702b0fc52ac9610a4180016aa80ae.jpg" alt="/" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong id={`${reviewId}`}>Bastian Hilcker</strong>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Duis porta eros lacus, nec ultricies elit blandit non.
            Suspendisse pellentesque mauris sit amet dolor blandit rutrum. Nunc in tempus turpis.
            <br />
            <small>
              <a href={`#${reviewId}`}>
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
              <a href="#AunNoLaHacemos">Report</a>
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
