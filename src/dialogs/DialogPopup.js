import React from 'react';
import { getMessage, getTitle } from './model';

import {
  PopTicket,
  PopTicketTitle,
  PopTicketDesc,
} from './TicketMessage.styled';

const InfoMessage = ({ title, message }) => {
  return (
    <PopTicket id="popup-ticket"
      style={{ padding: 30 }}
    >
      <PopTicketTitle>{title}</PopTicketTitle>
      <PopTicketDesc>{message}</PopTicketDesc>
    </PopTicket>
  );
};

const DialogPopup = ({ content, status }) => {

  const message = getMessage(content, status);
  const title = getTitle(content);

  return <InfoMessage title={title} message={message} />;
};

export default DialogPopup;
