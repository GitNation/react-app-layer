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

const TicketMessage = ({ ticketsLink }) => {
  return (
    <PopTicket id="popup-ticket">
      <PopTicketTwoCol>
        <PopTicketColLeft>
          <PopTicketTitle>Have the Multipass or a full ticket?</PopTicketTitle>
          <PopTicketDesc>
            During conference days, enter your email assigned to the order to
            unlock all features.
          </PopTicketDesc>
          <PopTicketForm action="/live" method="get" target="_blank" noValidate>
            <PopTicketField>
              <PopTicketInput
                type="email"
                name="email"
                placeholder="Your email"
                className="pop-ticket__input"
              />
              <PopTicketSubmitButton
                className="pop-ticket__input_btn"
                type="submit"
              >
                <span>Unlock</span>
                <PopTicketArrowSvg>
                  <use xlinkHref="img/sprite.svg#icon-arrow-right" />
                </PopTicketArrowSvg>
              </PopTicketSubmitButton>
            </PopTicketField>
          </PopTicketForm>
        </PopTicketColLeft>
        <PopTicketColRight>
          <PopTicketTitle>Get an upgrade</PopTicketTitle>
          <PopTicketDesc>
            Get your Multipass (or a full ticket) and unlock the full conf
            experience with free hands-on workshops, speaker Q&amp;A rooms,
            instant access to recordings and more!
            <br /> Multipass also grants access to 10+ more top class JS events.
          </PopTicketDesc>
          <PopTicketButtonWithBorder
            href="https://portal.gitnation.org/multipass"
            className="pop-ticket__btn btn btn--border"
            target="blank_"
          >
            Buy Multipass
          </PopTicketButtonWithBorder>
        </PopTicketColRight>
      </PopTicketTwoCol>
    </PopTicket>
  );
};

export default TicketMessage;
