import React from 'react';
import { getMessage, getTitle } from './model';

const InfoMessage = ({ title, message }) => {
  return (
    <div
      className="pop-ticket fancybox-content"
      id="popup-ticket"
      style={{ display: 'inline-block', padding: 30 }}
    >
      <p className="pop-ticket__title">{title}</p>
      <p className="pop-ticket__desc">{message}</p>
    </div>
  );
};

const DialogPopup = ({ content, status }) => {

  const message = getMessage(content, status);
  const title = getTitle(content);

  return <InfoMessage title={title} message={message} />;
};

export default DialogPopup;
