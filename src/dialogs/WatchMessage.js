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
  ForgotLinkContainer,
} from './TicketMessage.styled';

// TODO: remove hardcode for JSNation

const WatchMessage = ({ ticketsLink, onForgotLinkClick }) => {
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
          <PopTicketTitle>Have a full ticket?</PopTicketTitle>
          <PopTicketDesc>
            You should have received an email with personal access code, please
            enter it below to get to the live stream page. If you can't find the
            email (including the spam folder), please follow the link below.
          </PopTicketDesc>
          <PopTicketForm
            action="/watch-full-access"
            method="get"
            target="_blank"
            noValidate
          >
            <PopTicketField>
              <PopTicketInput type="text" name="code" placeholder="Your code" />
              <PopTicketSubmitButton type="submit">
                <span>Unlock</span>
                <PopTicketArrowSvg>
                  <use xlinkHref="img/sprite.svg#icon-arrow-right" />
                </PopTicketArrowSvg>
              </PopTicketSubmitButton>
              <ForgotLinkContainer onClick={onForgotLinkClick}>
                Can't find my code
              </ForgotLinkContainer>
            </PopTicketField>
          </PopTicketForm>
        </PopTicketColRight>
      </PopTicketTwoCol>
    </PopTicket>
  );
};

export default WatchMessage;
