import React from 'react';

const TicketMessage = ({ link }) => {
  return (
    <div
      className="pop-ticket fancybox-content"
      id="popup-ticket"
      style={{ display: 'inline-block' }}
    >
      <div className="pop-ticket__two-col">
        <div className="pop-ticket__left">
          <p className="pop-ticket__title">Dont have a full ticket?</p>
          <p className="pop-ticket__desc">
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
          </a>
        </div>
        <div className="pop-ticket__right">
          <p className="pop-ticket__title">Have a full ticket?</p>
          <p className="pop-ticket__desc">
            Use your access code from the ticket to unlock all features
          </p>
          <form
            action="/watch-full-access"
            method="get"
            className="c-form"
            target="_blank"
            noValidate
          >
            <div className="c-form__field">
              <input
                type="text"
                name="code"
                className="c-form__input"
                placeholder="Your code"
              />
              <button type="submit" className="c-form__submit">
                <span>Unlock</span>
                <svg className="icon icon-arrow-right">
                  <use xlinkHref="img/sprite.svg#icon-arrow-right" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
      <button
        type="button"
        data-fancybox-close
        className="fancybox-button fancybox-close-small"
        title="Close"
      >
        <svg xmlns="http://www.w3.org/2000/svg" version={1} viewBox="0 0 24 24">
          <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z" />
        </svg>
      </button>
    </div>
  );
};

export default TicketMessage;
