import React from 'react';
import { getMessage, getTitle } from './model';

import {
  PopTicket,
  PopTicketTwoCol,
  PopTicketColLeft,
  PopTicketTitle,
  PopTicketDesc,
  PopTicketButtonWithBorder,
  PopTicketColRight,
  PopTicketForm,
  PopTicketField,
  PopTicketInput,
  PopTicketSubmitButton,
  PopTicketArrowSvg
} from './styled';

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
