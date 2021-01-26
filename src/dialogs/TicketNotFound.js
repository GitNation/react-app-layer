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

const TicketNotFound = () => {
  const email = window.location.search
    ? window.location.search.split('?email=')[1]
    : '';

  return (
    <PopTicket id="popup-ticket">
      <PopTicketTwoCol>
        <PopTicketColRight>
          <PopTicketTitle>
            We could registered tickets to provided email
            {email && ` - ${email}`}
          </PopTicketTitle>
          <PopTicketDesc>
            If you have ticket to the event, please double check the email used
            to register on{' '}
            <a href="https://ti.to/gitnation/testjs-summit" target="_blank">
              Ti.to
            </a>{' '}
            and enter your email below
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
          <div style={{ height: '30px' }} />
          <PopTicketDesc>
            If you don't have a ticket, please register via our{' '}
            <a href="https://ti.to/gitnation/testjs-summit" target="_blank">
              Ti.to
            </a>{' '}
            page.
          </PopTicketDesc>
        </PopTicketColRight>
      </PopTicketTwoCol>
    </PopTicket>
  );
};

export default TicketNotFound;
