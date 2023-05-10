import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import RelativePortal from 'react-relative-portal';

import { calcWidth } from './model';
import { TABLET_WIDTH } from '../constants';

const roomIcon = (
  <svg
    className="icon icon-sl"
    dangerouslySetInnerHTML={{
      __html: '<use xlink:href="img/sprite.svg#icon-discord"></use>',
    }}
  ></svg>
);

const camIcon = (
  <svg
    className="icon icon-cam"
    dangerouslySetInnerHTML={{
      __html: '<use xlink:href="img/sprite.svg#icon-cam"></use>',
    }}
  ></svg>
);

const EventContainer = styled.div`
  position: absolute;
  left: ${({ position }) => position}px;
  width: ${({ width }) => width}px;
  top: -10px;
  cursor: default;
`;

const TrackContent = styled.div`
  position: relative;
  left: ${({ adjust }) => adjust}px;
  top: -50%;
  width: 100%;
`;

const ePic = (pic) => {
  if (!pic) {
    return null;
  }

  let imgSrc = '';
  // new ems format, when avatar passed as a string instead of object (user.avatar db field)
  if (typeof pic === 'string') {
    imgSrc = pic;
  } else {
    const picId = pic.url.split('/').reverse()[0];
    imgSrc = `https://media.graphassets.com/resize=fit:crop,height:100,width:100/output=format:webp/${picId}`;
  }

  return (
    <div className="time-track__pic">
      <img src={imgSrc} />
    </div>
  );
};

const eTitle = (speaker, title) => (
  <div className="time-track__speaker">{getTitleStr(speaker, title)}</div>
);

const getTitleStr = (speaker, title) =>
  speaker ? `${speaker} «‎${title}»` : title;

const iSpeaker = (name, place, title, text) => (
  <React.Fragment>
    <p className="track-tooltip__speaker">
      {name}, {place}
    </p>
    <p className="track-tooltip__title">«‎{title}»</p>
    <div
      className="track-tooltip__desc"
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    ></div>
  </React.Fragment>
);

const iLt = (title, lightningTalks) => (
  <React.Fragment>
    <p className="track-tooltip__speaker">{title}</p>
    {(lightningTalks || []).map((lt, i) => (
      <div className="track-tooltip__sec" key={i}>
        <p className="track-tooltip__title">
          {lt.title} - {lt.name}
        </p>

        <div
          className="track-tooltip__desc"
          dangerouslySetInnerHTML={{
            __html: lt.text,
          }}
        ></div>
      </div>
    ))}
  </React.Fragment>
);

const DiscussionRoomTooltipContent = ({ text, title, speakers }) => {
  if (text) {
    return (
      <div
        className="time-track__discussion-link"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    );
  }

  return (
    <div>
      {speakers.map((info) => (
        <p key={info.name}>
          <strong>{info.name}</strong>
          {info.company ? ` (${info.company})` : null}
        </p>
      ))}
    </div>
  );
};

const Tooltip = ({ children, on }) => (on ? <div>{children}</div> : null);

const Talk = ({ talk, onClick, isOrgEvent }) => {
  const {
    avatar,
    speaker,
    title,
    lightningTalks,
    text,
    name,
    place,
    description,
  } = talk;

  const handleClick = () => {
    onClick({ date: '', track: '' });
  };

  const [isVisible, toggleIsVisible] = useState(false);

  const isAsLeastOneTooltipExists =
    name || lightningTalks || (isOrgEvent && !!description);

  const changePortalVisibility = useCallback((boolean) => {
    if (window && window?.innerWidth > TABLET_WIDTH) {
      toggleIsVisible(boolean);
    }
  }, []);

  return (
    <div
      className="time-track__item js-time"
      onClick={handleClick}
      title={!name && !lightningTalks ? getTitleStr(speaker, title) : ''}
      style={{
        '--bgColor': talk.bgColor,
        width: '100%',
        cursor: 'pointer',
      }}
      onMouseEnter={() => changePortalVisibility(true)}
      onMouseLeave={() => changePortalVisibility(false)}
    >
      <RelativePortal left={0} top={20}>
        {isVisible && isAsLeastOneTooltipExists && (
          <div
            className="track-tooltip"
            style={{ position: 'sticky', '--bgColor': talk.bgColor }}
          >
            <Tooltip on={!!name}>{iSpeaker(name, place, title, text)}</Tooltip>
            <Tooltip on={!!lightningTalks}>
              {iLt(title, lightningTalks)}
            </Tooltip>
            <Tooltip on={isOrgEvent && !!description}>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </Tooltip>
          </div>
        )}
      </RelativePortal>
      {ePic(avatar)}
      {eTitle(speaker, title)}
    </div>
  );
};

const QARoom = ({ talk, onClick }) => {
  const handleClick = () => {
    onClick({ date: '', track: '', isQaEvent: true });
  };
  return (
    <a
      onClick={handleClick}
      className="time-track__link js-time"
      style={{ '--bgColor': talk.bgColor, width: '100%' }}
    >
      Q&A {roomIcon}
    </a>
  );
};

const SpeakerRoom = ({ talk, onClick }) => {
  const { speakers, title, roomLink, type } = talk;
  const [speaker] = speakers;

  const handleClick = () => {
    let samePage = false;
    if (roomLink?.[0] === '#') {
      samePage = true;
    }
    let override = {};
    if (type === 'expo-room') {
      // TODO: passing empty data and track will make speakers room available during the whole event
      override = { date: '', track: '', time: '', duration: '' };
    }
    onClick({ ...override, samePage });
  };

  return (
    <a
      onClick={handleClick}
      className="time-track__link room js-time"
      style={{ '--bgColor': talk.bgColor, width: '100%' }}
    >
      {ePic(speaker.avatar)}
      {eTitle('', title)}
    </a>
  );
};

const DiscussionRoom = ({ talk, onClick }) => {
  const { pic, speakers, title, text } = talk;

  const [isVisible, toggleIsVisible] = useState(false);

  const changePortalVisibility = useCallback((boolean) => {
    if (window && window?.innerWidth > TABLET_WIDTH) {
      toggleIsVisible(boolean);
    }
  }, []);

  return (
    <a
      onClick={onClick}
      className="time-track__item time-track__link discussion js-time"
      style={{ '--bgColor': talk.bgColor, width: '100%' }}
      onMouseEnter={() => changePortalVisibility(true)}
      onMouseLeave={() => changePortalVisibility(false)}
    >
      <RelativePortal left={0} top={20}>
        {isVisible && title && (
          <div
            className="track-tooltip"
            style={{ position: 'sticky', '--bgColor': talk.bgColor }}
          >
            <Tooltip on={!!title}>
              <DiscussionRoomTooltipContent
                text={text}
                title={title}
                speakers={speakers}
              />
            </Tooltip>
          </div>
        )}
      </RelativePortal>
      {ePic(pic, 'png')}
      {eTitle('', title)}
      {camIcon}
    </a>
  );
};

const TrackEvent = ({ event, calcPosition, onClick, trackTitle }) => {
  const position = calcPosition(event);
  const width = calcWidth(event.duration);

  const handleClick = (info) => {
    onClick({ ...event, ...info, trackTitle });
  };

  if (event.eventType === 'QA') {
    return (
      <EventContainer position={position} width={width}>
        <QARoom talk={event} onClick={handleClick} />
      </EventContainer>
    );
  }

  if (event.eventType === 'SpeakersRoom') {
    return (
      <EventContainer position={position} width={width}>
        <SpeakerRoom talk={event} onClick={handleClick} />
      </EventContainer>
    );
  }

  if (
    event.eventType === 'PanelDiscussion' ||
    event.eventType === 'DiscussionRoom'
  ) {
    return (
      <EventContainer position={position} width={width}>
        <DiscussionRoom talk={event} onClick={handleClick} />
      </EventContainer>
    );
  }

  if (event.eventType === 'OrgEvent') {
    return (
      <EventContainer position={position} width={width}>
        <Talk talk={event} onClick={handleClick} isOrgEvent />
      </EventContainer>
    );
  }

  return (
    <EventContainer position={position} width={width}>
      <Talk talk={event} onClick={handleClick} />
    </EventContainer>
  );
};

function Track({ track, calcPosition, onClick }) {
  const { list, title } = track;

  return (
    <div
      className={cn('time-track__track', { odd: track.odd })}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}
    >
      <TrackContent adjust={26}>
        {list.map((evt, i) => (
          <TrackEvent
            key={i}
            event={evt}
            trackTitle={title}
            calcPosition={calcPosition}
            onClick={onClick}
          />
        ))}
      </TrackContent>
    </div>
  );
}

export default Track;
