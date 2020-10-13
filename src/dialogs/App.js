import React, { useCallback } from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import styled, { createGlobalStyle } from 'styled-components';

import DialogPopup from './DialogPopup';
import { getEventStatus } from './model';
import NewTab from './NewTab';
import TicketMessage from './TicketMessage';
import WatchMessage from './WatchMessage';
import SpeakerCard from './SpeakerCard';
import RemindCode from './RemindCode';
import { createCalendarLink } from '../calendar-provider';

const eventNames = [
  'video-room',
  'qa-room',
  'speaker-room',
  'discussion-room',
  'any-room',
  'link',
  'random-room',
  'speaker-card',
  'watch-livestream',
  'talk-calendar',
  'quake',
  'remind-code-modal',
  'open-base-modal',
];

const GlobalStyle = createGlobalStyle`
  [data-reach-dialog-overlay] {
    background-color: ${({ isOpen }) =>
      isOpen ? 'hsla(0, 0%, 0%, 0.85)' : 'hsla(0, 0%, 0%, 0.4)'};
    transition: background-color 500ms ease;
    z-index: 10;
  }

  [data-reach-dialog-content] {
    background: none;
    padding: 0;
  }
  
  [data-reach-dialog-overlay] [data-reach-dialog-content] {
    width: 840px;
    max-width: 100%;
  }
`;

const navigateByLink = (link, samePage) => {
  const a = document.createElement('a');
  a.href = link;
  if (!samePage) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const navToRandom = (content) => {
  const { links } = content;
  if (!links) {
    return;
  }
  const len = links.length;
  const ind = Math.floor(Math.random() * len);
  navigateByLink(links[ind]);
};

const navToQuake = (link) => {
  const randInd = 1000 + Math.round(Math.random() * 999);
  const defaultNick = `JSN Attender ${randInd}`;
  const nickName = prompt('Enter you nickname', defaultNick);
  const personalLink = `${link}&name ${nickName}`;
  navigateByLink(personalLink);
};

const useBusEvents = (bus) => {
  const [isOpen, setOpen] = React.useState(false);
  const [type, setType] = React.useState(null);
  const [content, setContent] = React.useState(null);

  const close = () => setOpen(false);

  const getDetails = (content) => {
    const { reactLayerConfig = {} } = bus.getContent();

    const status = content ? getEventStatus(content) : null;
    const isNow = status && status.status === 'now';
    const eventIsAuth = content && content.isAuth;
    const isAuth = eventIsAuth !== null ? eventIsAuth : bus.content.isAuth;

    return {
      status: status && status.status,
      isNow,
      isAuth,
      reactLayerConfig,
    };
  };

  const onEvent = ({ type, payload }) => {
    if (type === 'click' && eventNames.includes(payload.name)) {
      setType(payload.name);
      setContent(payload);

      const { status, isAuth, reactLayerConfig } = getDetails(payload);

      const {
        calendarEventDescription,
        calendarEventName,
        conferenceStart,
        conferenceEnd,
      } = reactLayerConfig;

      if (payload.name === 'speaker-card') {
        setOpen(true);
        return;
      }

      if (payload.name === 'talk-calendar') {
        const speaker = {
          name: payload.data.speaker,
          activities: {
            talks: [payload.data],
          },
        };
        const link = createCalendarLink(speaker, {
          calendarEventDescription,
          calendarEventName,
          conferenceStart,
          conferenceEnd,
        });
        navigateByLink(link);
        return;
      }

      /* if link is available just click it */
      if ((!status || status === 'now') && isAuth) {
        if (payload.name === 'random-room') {
          navToRandom(payload.data);
          return;
        }
        if (payload.name === 'quake') {
          navToQuake(payload.link);
          return;
        }
        if (payload.link) {
          const samePage = payload.data && payload.data.samePage;
          navigateByLink(payload.link, samePage);
          return;
        }
      } else {
        setOpen(true);
      }
    }
  };

  React.useEffect(() => {
    bus.subscribe(onEvent);
    const unsubscribe = () => {
      /* do nothing as this app is not going to by unmounted */
    };
    return unsubscribe;
  }, []);

  const { status, isAuth, isNow, reactLayerConfig } = getDetails(content);

  return {
    isOpen,
    type,
    close,
    content,
    status,
    isNow,
    isAuth,
    reactLayerConfig,
  };
};

const App = ({ bus }) => {
  const { isOpen, close, type, content, status, isAuth } = useBusEvents(bus);

  const { reactLayerConfig = {} } = bus.getContent();

  const onForgotLinkClick = useCallback(
    () => bus.clickEvent({ name: 'remind-code-modal' }),
    [bus],
  );

  const {
    ticketsLink,
    hideSpeakerPopupLabel,
    calendarEventDescription,
    calendarEventName,
    conferenceStart,
    conferenceEnd,
  } = reactLayerConfig;

  if (type === 'remind-code-modal') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="video message from organizers">
          {isOpen && <RemindCode ticketsLink={ticketsLink} />}
        </DialogContent>
      </DialogOverlay>
    );
  }

  if (type === 'watch-livestream') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="video message from organizers">
          {isOpen ? (
            <WatchMessage
              ticketsLink={ticketsLink}
              onForgotLinkClick={onForgotLinkClick}
            />
          ) : null}
        </DialogContent>
      </DialogOverlay>
    );
  }

  if (!content || !isOpen) {
    return null;
  }

  if (type === 'speaker-card') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="this activity is not available">
          {isOpen ? (
            <SpeakerCard
              type={type}
              content={content}
              status={status}
              hideLabel={hideSpeakerPopupLabel}
              calendarLinkOptions={{
                calendarEventDescription,
                calendarEventName,
                conferenceStart,
                conferenceEnd,
              }}
            />
          ) : null}
        </DialogContent>
      </DialogOverlay>
    );
  }

  if (!isAuth && status !== 'archived') {
    /* not Auth users always see tickets message */
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="this activity is not available">
          {isOpen ? <TicketMessage ticketsLink={ticketsLink} /> : null}
        </DialogContent>
      </DialogOverlay>
    );
  }

  /* Auth users if not followed the link will see the popup with explanation */
  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close}>
      <GlobalStyle isOpen={isOpen} />
      <DialogContent aria-label="this activity is not available">
        {isOpen ? (
          <DialogPopup type={type} content={content} status={status} />
        ) : null}
      </DialogContent>
    </DialogOverlay>
  );
};

export default App;
