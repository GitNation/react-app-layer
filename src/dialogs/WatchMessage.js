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
} from './styled';

const TicketMessage = () => {
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
          <PopTicketButtonWithBorder
            href="https://ti.to/gitnation/react-summit"
            target="blank_"
          >
            Register
          </PopTicketButtonWithBorder>
        </PopTicketColLeft>
        <PopTicketColRight>
          <PopTicketTitle>Have a full ticket?</PopTicketTitle>
          <PopTicketDesc>
            You should have received an email with personal access code, please
            enter it below to get to the live stream page. If you can't find the
            email (including the spam folder), please check your code{' '}
            <a href="https://forms.gle/SC4kGz57RnMBHEX2A">here</a>, if still
            having trouble please <a href="mailto:hi@jsnation.com">send us</a>{' '}
            your ticket order number to get help.
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
