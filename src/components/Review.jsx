import React from 'react';
import SingleReview from './SingleReview';
import CreateReview from './CreateReview';

export default function Review() {
  return (
    <section className="section is-small">
      <div className="card">
        <div className="card-content">
          <SingleReview key={1} reviewId={1} />
          <SingleReview key={2} reviewId={2} />
          <CreateReview />
        </div>
      </div>
    </section>
  );
}
