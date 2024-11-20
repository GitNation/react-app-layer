import React, { useCallback } from 'react';
import { Dialog, DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import styled, { createGlobalStyle } from 'styled-components';

import DialogPopup from './DialogPopup';
import { getEventStatus } from './model';
import NewTab from './NewTab';
import TicketMessage from './TicketMessage';
import WatchMessage from './WatchMessage';
import WatchMessagePaid from './WatchMessagePaid';
import TicketNotFound from './TicketNotFound';
import SpeakerCard from './SpeakerCard';
import SponsorCard from './SponsorCard';
import {
  createCalendarLink,
  getWorkshopCalendarLink,
} from '../calendar-provider';
import LightningTalkCard from './LightningTalksCard';
import WorkshopCard from './WorkshopCard';

const eventNames = [
  'video-room',
  'qa-room',
  'speaker-room',
  'discussion-room',
  'any-room',
  'link',
  'random-room',
  'speaker-card',
  'speaker-card-offline',
  'workshop-card',
  'sponsor-card',
  'watch-livestream',
  'watch-livestream-paid',
  'ticket-not-fount',
  'talk-calendar',
  'quake',
  'open-base-modal',
  'workshop-calendar',
  'video-widget',
  'lightning-talks',
];

const GlobalStyle = createGlobalStyle`
  [data-reach-dialog-overlay] {
    background-color: ${({ isOpen }) =>
      isOpen ? 'hsla(0, 0%, 0%, 0.85)' : 'hsla(0, 0%, 0%, 0.4)'};
    transition: background-color 500ms ease;
    z-index: 20;
  }

  [data-reach-dialog-content] {
    background: none;
    padding: 0;
  }
  
  [data-reach-dialog-overlay] [data-reach-dialog-content] {
    width: 840px;
    position: relative;
    max-width: 100%;
  }
  
`;

export const PopCloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  z-index: 101;
  cursor: pointer;
  text-align: center;
  background-color: transparent;
  padding: 0;
  color: var(--color-popup-button-close, #000);
  transition: all ease 0.3s;

  &:after,
  &:before {
    content: '';
    width: 26px;
    height: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -13px;
    margin-top: -1px;
    border-radius: 10px;
    background: var(--color-popup-button-text, #fff);
  }
  &:after {
    transform: rotate(45deg);
  }
  &:before {
    transform: rotate(-45deg);
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
  const defaultNick = `GitNation hero ${randInd}`;
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
    const { reactLayerConfig = {}, eventInfo } = bus.getContent();

    const status = content ? getEventStatus(content) : null;
    const isNow = status && status.status === 'now';
    const eventIsAuth = content && content.isAuth;
    const isAuth = eventIsAuth !== null ? eventIsAuth : bus.content.isAuth;

    return {
      status: status && status.status,
      isNow,
      isAuth,
      reactLayerConfig: {
        ...reactLayerConfig,
        conferenceStart: eventInfo.conferenceStart,
        conferenceEnd: eventInfo.conferenceFinish,
      },
    };
  };

  const onEvent = ({ type, payload }) => {
    if (type === 'click' && eventNames.includes(payload.name)) {
      setType(payload.name);
      setContent(payload);

      const { status, isAuth, reactLayerConfig } = getDetails(payload);

      const {
        calendarEventDescription,
        calendarWorkshopDescription = '',
        calendarEventName,
        conferenceStart,
        conferenceEnd,
        pagesPieceOfTexts,
      } = reactLayerConfig;

      if (payload.name === 'workshop-card') {
        payload.pagesPieceOfTexts = pagesPieceOfTexts;
        setOpen(true);
        return;
      }

      if (
        payload.name === 'speaker-card' ||
        payload.name === 'speaker-card-offline' ||
        payload.name === 'sponsor-card' ||
        payload.name === 'lightning-talks'
      ) {
        setOpen(true);
        return;
      }

      if (payload.name === 'talk-calendar') {
        const speakers = payload.data.speakers || [payload.data.speaker];
        const link = createCalendarLink(
          speakers,
          { allTalks: [payload.data] },
          {
            calendarEventDescription,
            calendarEventName,
            conferenceStart,
            conferenceEnd,
          },
        );

        navigateByLink(link);

        return;
      }

      if (payload.name === 'workshop-calendar') {
        const link = getWorkshopCalendarLink(
          payload.data,
          calendarWorkshopDescription,
        );

        navigateByLink(link);
        return;
      }

      // video-widget should open link even after event is over
      if (isAuth && payload.name === 'video-widget' && payload.link) {
        navigateByLink(payload.link);
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
    setOpen,
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
  const {
    isOpen,
    close,
    type,
    content,
    status,
    isAuth,
    setOpen,
  } = useBusEvents(bus);

  const { reactLayerConfig = {}, eventInfo } = bus.getContent();

  const {
    conferenceStart: conferenceStart,
    conferenceFinish: conferenceEnd,
    topSpeaker,
    emsEvent,
  } = eventInfo;

  const {
    ticketsLink,
    hideSpeakerPopupLabel,
    calendarEventDescription,
    calendarEventName,
  } = reactLayerConfig;

  const actionUrl = `https://portal.gitnation.org/events/${emsEvent.slug}/watch`;
  if (type === 'watch-livestream') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="video message from organizers">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
          {isOpen ? (
            <WatchMessage
              ticketsLink={ticketsLink}
              badgeUrl={topSpeaker?.badgeUrl}
              actionUrl={actionUrl}
            />
          ) : null}
        </DialogContent>
      </DialogOverlay>
    );
  }

  if (type === 'watch-livestream-paid') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="video message from organizers">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
          {Boolean(isOpen) && <WatchMessagePaid actionUrl={actionUrl} />}
        </DialogContent>
      </DialogOverlay>
    );
  }
  if (type === 'ticket-not-fount') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={() => {}}>
        <GlobalStyle isOpen={false} />
        <DialogContent aria-label="video message from organizers">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
          {Boolean(isOpen) && <TicketNotFound ticketsLink={ticketsLink} />}
        </DialogContent>
      </DialogOverlay>
    );
  }

  if (!content || !isOpen) {
    return null;
  }

  if (type === 'workshop-card') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="popup with details about workshop">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
          <WorkshopCard content={content} closeCard={() => setOpen(false)} />
        </DialogContent>
      </DialogOverlay>
    );
  }

  if (type === 'speaker-card' || type === 'speaker-card-offline') {
    const isOfflineCard = type === 'speaker-card-offline';

    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />

        <DialogContent aria-label="popup with details about speaker">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
          {isOpen ? (
            <SpeakerCard
              isOfflineCard={isOfflineCard}
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

  if (type === 'lightning-talks') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="popup with details about speaker">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
          {isOpen ? (
            <LightningTalkCard
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

  if (type === 'sponsor-card') {
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="popup with details about partner">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
          {isOpen ? <SponsorCard content={content} /> : null}
        </DialogContent>
      </DialogOverlay>
    );
  }

  // video-widget full ticket box should be shown event after event is over
  if (!isAuth && (status !== 'archived' || type === 'video-widget')) {
    /* not Auth users always see tickets message */
    return (
      <DialogOverlay isOpen={isOpen} onDismiss={close}>
        <GlobalStyle isOpen={isOpen} />
        <DialogContent aria-label="this activity is not available">
          <PopCloseButton
            onClick={() => setOpen(false)}
            aria-label="popup close"
          ></PopCloseButton>
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
        <PopCloseButton
          onClick={() => setOpen(false)}
          aria-label="popup close"
        ></PopCloseButton>
        {isOpen ? (
          <DialogPopup type={type} content={content} status={status} />
        ) : null}
      </DialogContent>
    </DialogOverlay>
  );
};

export default App;
