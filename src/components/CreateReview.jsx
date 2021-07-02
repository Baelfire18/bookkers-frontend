import React from 'react';

export default function CreateReview() {
  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png" alt="/" />
        </p>
      </figure>
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea className="textarea" placeholder="Add a Review..." />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button" id="CreateReview" type="submit">Post Review</button>
          </p>
        </div>
      </div>
    </article>
  );
}