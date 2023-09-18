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

const WatchMessage = ({ ticketsLink, badgeUrl, actionUrl }) => {
  return (
    <PopTicket id="popup-ticket">
      <PopTicketTwoCol>
        <PopTicketColLeft>
          <PopTicketTitle>Have a ticket?</PopTicketTitle>
          <PopTicketDesc>
            Please enter your email associated with the ticket order or
            Multipass below. If you're not sure, please check an email from the
            event org team containing direct access link.
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
        </PopTicketColLeft>
        <PopTicketColRight>
          <PopTicketTitle>Claim free limited access</PopTicketTitle>
          <PopTicketDesc>
            Access the conference stream page with free partner perks, workshop
            opportunities and check your email for a possibility to upgrade to
            full ticket by sharing your personalized badge.
          </PopTicketDesc>
          <PopTicketButtonWithBorder href={badgeUrl} target="blank_">
            Claim access
          </PopTicketButtonWithBorder>
        </PopTicketColRight>
      </PopTicketTwoCol>
    </PopTicket>
  );
};

export default WatchMessage;
