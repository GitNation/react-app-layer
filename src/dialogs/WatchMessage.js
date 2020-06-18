import React from 'react';

const TicketMessage = () => {
  return (
    <div
      className="pop-ticket fancybox-content"
      id="popup-ticket"
      style={{ display: 'inline-block' }}
    >
      <div className="pop-ticket__two-col">
        <div className="pop-ticket__left">
          <p className="pop-ticket__title">Have free registration?</p>
          <p className="pop-ticket__desc">
            You should have received an email with the watch link, please check
            your spam folder as well. If you have not registered yet, follow the
            link below and ticket confirmation email will include the watch
            link.
          </p>
          <a
            href="https://ti.to/gitnation/jsnation-live"
            className="pop-ticket__btn btn btn--border"
            target="blank_"
          >
            Register
          </a>
        </div>
        <div className="pop-ticket__right">
          <p className="pop-ticket__title">Have a full ticket?</p>
          <p className="pop-ticket__desc">
            You should have received an email with personal access code, please
            enter it below to get to the live stream page. If you can't find the
            email (including the spam folder), please check your code{' '}
            <a href="https://forms.gle/SC4kGz57RnMBHEX2A">here</a>, if still
            having trouble please <a href="mailto:hi@jsnation.com">send us</a>{' '}
            your ticket order number to get help.
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
