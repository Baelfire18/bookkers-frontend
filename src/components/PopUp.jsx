import React from 'react';
import '../styles/PopUp.css';

export default function PopUp(prop) {
  return (
    <>
      {(prop.trigger) ? (
        <div className="popup">
          <div className="popup-inner">
            <button
              className="close-btn"
              onClick={() => prop.setTrigger(false)}
            >
              close
            </button>
            Wenlo 420
            { prop.children }
          </div>
        </div>
      ) : ''}
    </>
  );
}
