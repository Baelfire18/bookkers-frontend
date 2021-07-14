import React from 'react';



export default function SingleReport(prop) {
  const { report }= prop;

  return (
    <article className="media">
      <figure className="media-left">
        <p className="image is-48x48">
          <img src="https://res.cloudinary.com/dhlmiijdd/image/upload/v1624203818/1755103_ebhg9f.png" alt="/" />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <br />
            {report.content}
            <br />

          </p>
        </div>
      </div>
    </article>
  );
}