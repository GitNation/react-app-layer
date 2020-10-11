import React, { useState, useCallback } from 'react';

import { titoFindTicket } from '../services/tito-find-ticket';
import { redirectToLivePage } from '../utils/redirect-to-live';

import {
  PopTicket,
  PopTicketColLeft,
  PopTicketTitle,
  PopTicketSubmitButton,
  PopTicketField,
  PopTicketArrowSvg,
  PopTicketInput,
  PopTicketDesc,
  PopTicketButtonWithBorder,
  ButtonsContainer,
} from './TicketMessage.styled';

const RemindCode = ({ ticketsLink }) => {
  const [email, changeEmail] = useState('');
  const [isLoading, changeIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onInputChange = useCallback(({ target: { value } }) => {
    changeEmail(value);
  }, []);

  const handleTicketData = useCallback((data) => {
    const {
      data: { isTicketExists, code: ticketCode },
      error: dataError,
    } = data;

    if (error) {
      setError(dataError);
      changeIsLoading(false);

      return;
    }

    if (!isTicketExists) {
      changeIsLoading(false);
      setError('Sorry, we cannot find your ticket');

      return;
    }

    changeIsLoading(false);
    redirectToLivePage(ticketCode);
  }, []);

  const onSubmit = useCallback(() => {
    if (!email) {
      return;
    }

    changeIsLoading(true);
    titoFindTicket(email, handleTicketData);
  }, [email]);

  const goBack = useCallback((e) => {
    e.preventDefault();
    setError('');
  }, []);

  return (
    <PopTicket id="popup-ticket">
      <PopTicketColLeft>
        <PopTicketTitle>Find my registration</PopTicketTitle>
        {!error && (
          <PopTicketDesc>
            Please enter your email used to order the ticket and we will try
            matching it will the order and redirect you to the corresponding
            watch page.
          </PopTicketDesc>
        )}
        {error && (
          <PopTicketDesc>
            {error}
            <ButtonsContainer>
              <PopTicketButtonWithBorder href="" onClick={goBack}>
                Back
              </PopTicketButtonWithBorder>
              <PopTicketButtonWithBorder href={ticketsLink} target="blank_">
                Register
              </PopTicketButtonWithBorder>
            </ButtonsContainer>
          </PopTicketDesc>
        )}
        {isLoading && <PopTicketDesc>{'Loading...'}</PopTicketDesc>}
        {!isLoading && !error && (
          <PopTicketField>
            <PopTicketInput
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={onInputChange}
            />
            <PopTicketSubmitButton onClick={onSubmit}>
              <span>Find</span>
              <PopTicketArrowSvg>
                <use xlinkHref="img/sprite.svg#icon-arrow-right" />
              </PopTicketArrowSvg>
            </PopTicketSubmitButton>
          </PopTicketField>
        )}
      </PopTicketColLeft>
    </PopTicket>
  );
};

export default RemindCode;
