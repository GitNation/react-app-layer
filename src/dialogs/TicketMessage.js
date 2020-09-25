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
  PopTicketArrowSvg
} from './TicketMessage.styled';

const TicketMessage = ({ link }) => {
  return (
    <PopTicket id="popup-ticket">
      <PopTicketTwoCol>
        <PopTicketColLeft>
          <PopTicketTitle>Dont have a full ticket?</PopTicketTitle>
          <PopTicketDesc>
            Free ticket holders can watch our conference talks, but all other
            activities are only available to full-access attendees. Upgrade your
            ticket and get to join Q&amp;As with pro speakers, advice lounge
            with our experts, networking rooms, afterparty, and you’ll also
            enjoy many other perks.
          </p>
          <a
            href={link}
            className="pop-ticket__btn btn btn--border"
            target="blank_"
          >
            Get one
          </PopTicketButtonWithBorder>
        </PopTicketColLeft>
        <PopTicketColRight>
          <PopTicketTitle>Have a full ticket?</PopTicketTitle>
          <PopTicketDesc>
            Use your access code from the ticket to unlock all features
          </PopTicketDesc>
          <PopTicketForm
            action="/watch-full-access"
            method="get"
            target="_blank"
            noValidate
          >
            <PopTicketField>
              <PopTicketInput
                type="text"
                name="code"
                placeholder="Your code"
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

export default TicketMessage;
