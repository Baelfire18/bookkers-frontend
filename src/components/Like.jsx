import React, { useState, useEffect } from 'react';
import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { Deserializer } from 'jsonapi-serializer';
import useAuth from '../hooks/useAuth';

export default function Like(prop) {
  return (
    <>
      <a>
        <FcLike />
        {' '}
        Like
        {' '}
      </a>
    </>
  );
}
