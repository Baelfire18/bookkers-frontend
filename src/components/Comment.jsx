import React from 'react';
import SingleComment from './SingleComment';
import CreateComment from './CreateComment';

export default function Comment() {
  return (
    <section className="section is-small">
      <div className="card">
        <div className="card-content">
          <SingleComment />
          <SingleComment />
          <CreateComment />
        </div>
      </div>
    </section>
  );
}
