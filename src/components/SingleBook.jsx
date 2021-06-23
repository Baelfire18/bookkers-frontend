import React from 'react';
/* eslint-disable react/prop-types */
function SingleBook({ title, img }) {
  return (
    <li className="SingleBook">
      <h3>{title}</h3>
      <img alt="book" src={img} />
    </li>
  );
}

export default SingleBook;
