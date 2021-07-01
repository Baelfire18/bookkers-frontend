import React from 'react';
import SingleComment from './SingleComment';
import CreateComment from './CreateComment';

export default function Comment() {
  return (
    <section className="section is-small">
      <div className="card">
        <div className="card-content">
          <SingleComment key={1} reviewId={1}/>
          <SingleComment key={2} reviewId={2}/>
          <CreateComment />
        </div>
      </div>
    </section>
  );
}
