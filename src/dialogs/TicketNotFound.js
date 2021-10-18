import React from 'react';
import { getCookie } from '../services/getCookie';

import {
  PopTicket,
  PopTicketTwoCol,
  PopTicketTitle,
  PopTicketDesc,
  PopTicketColRight,
  PopTicketForm,
  PopTicketField,
  PopTicketInput,
  PopTicketSubmitButton,
  PopTicketArrowSvg,
} from './TicketMessage.styled';

const TicketNotFound = ({ ticketsLink }) => {
  const email = getCookie('watchMail');

  return (
    <PopTicket id="popup-ticket">
      <PopTicketTwoCol>
        <PopTicketColRight>
          <PopTicketTitle>
            We could not find any associated tickets with the provided email
            {Boolean(email) && ` - ${email}`}
          </PopTicketTitle>
          <PopTicketDesc>
            If you have a ticket to the event, please double check the email
            used to register for the event on Tito, GitNation Portal (Multipass
            users) or digital badges and enter your email below
          </PopTicketDesc>
          <PopTicketForm action="/live" method="get" noValidate>
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
          <div style={{ height: '30px' }} />
          <PopTicketDesc>
            If you don't have a registration, see our ticket options{' '}
            <a href={ticketsLink} target="_blank">
              here
            </a>
            .
          </PopTicketDesc>
        </PopTicketColRight>
      </PopTicketTwoCol>
    </PopTicket>
  );
};

export default TicketNotFound;
