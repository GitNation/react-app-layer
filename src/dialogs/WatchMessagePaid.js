import React from 'react';

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
  PopTicketArrowSvg,
} from './TicketMessage.styled';

const WatchMessagePaid = ({ actionUrl }) => {
  return (
    <PopTicket id="popup-ticket">
      <PopTicketTwoCol>
        <PopTicketColRight>
          <PopTicketTitle>Have a ticket?</PopTicketTitle>
          <PopTicketDesc>
            Please enter your email associated with the ticket order below. If
            you're not sure, please check an email from the event org team
            containing direct access link and other useful instructions.
          </PopTicketDesc>
          <PopTicketForm
            action={actionUrl}
            method="get"
            target="_blank"
            noValidate
          >
            <PopTicketField>
              <PopTicketInput
                type="email"
                name="email"
                placeholder="Your email"
              />
              <PopTicketSubmitButton type="submit">
                <span>Unlock</span>
                <PopTicketArrowSvg>
                  <use xlinkHref="img/sprite.svg#icon-arrow-right" />
                </PopTicketArrowSvg>
              </PopTicketSubmitButton>
            </PopTicketField>
          </PopTicketForm>
        </PopTicketColRight>
      </PopTicketTwoCol>
    </PopTicket>
  );
};

export default WatchMessagePaid;
