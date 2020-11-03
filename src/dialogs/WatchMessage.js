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

const WatchMessage = ({ ticketsLink }) => {
  return (
    <PopTicket id="popup-ticket">
      <PopTicketTwoCol>
        <PopTicketColLeft>
          <PopTicketTitle>Have free registration?</PopTicketTitle>
          <PopTicketDesc>
            You should have received an email with the watch link, please check
            your spam folder as well. If you have not registered yet, follow the
            link below and ticket confirmation email will include the watch
            link.
          </PopTicketDesc>
          <PopTicketButtonWithBorder href={ticketsLink} target="blank_">
            Register
          </PopTicketButtonWithBorder>
        </PopTicketColLeft>
        <PopTicketColRight>
          <PopTicketTitle>Have a paid ticket?</PopTicketTitle>
          <PopTicketDesc>
            Please enter your email associated with the ticket order below. If
            you're not sure, please check an email from the event org team
            containing direct access link and other useful instructions.
          </PopTicketDesc>
          <PopTicketForm action="/live" method="get" target="_blank" noValidate>
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

export default WatchMessage;
