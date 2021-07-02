import React from 'react';
import { AiOutlineInstagram } from '@react-icons/all-files/ai/AiOutlineInstagram';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        {/* <Link to="https://www.instagram.com/bastian_hilcker/" target="_blanck" className="navbar-item">Check our Instagram <AiOutlineInstagram /></Link> */}
        <a href="https://www.instagram.com/bastian_hilcker/" target="_blanck" className="navbar-item">
          Check our Instagram
          <AiOutlineInstagram />
        </a>
      </div>
    </footer>
  );
}
