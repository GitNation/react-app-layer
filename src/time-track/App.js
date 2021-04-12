import React from 'react';
import Container from './Container';
import Aside from './Aside';
import TracksContent from './TracksContent';
import Track from './Track';
import { createTimeTicks, calcPositionFromTime } from './model';
import { trackGAEvent } from '../services/ga';
import { generateTimeEvents } from '../time-provider';

// TODO add to cms boolean flag to ignore event click
const IGNORE_CLICK_EVENT_SLUGS = [
  'day-1-closing-ceremony',
  'day-2-closing-ceremony',
  'break',
  'conference-opening',
  'day-1-opening',
  'day-2-opening',
  'day-3-opening',
];

const App = ({ bus }) => {
  const content = bus.getContent();
  const {
    customTracks,
    schedule,
    eventInfo,
    isAuth,
    availableTracks,

    speakers,
  } = content;

  const {
    chatLink,
    chatLinkAuth,
    conferenceStart: startTime,
    conferenceFinish: endTime,
  } = eventInfo;

  const timeTicks = createTimeTicks(startTime, endTime);
  const calcPosition = calcPositionFromTime(startTime);
  const trackWidth = calcPosition({ isoDate: endTime });

  const handleClick = (eventContent) => {
    if (IGNORE_CLICK_EVENT_SLUGS.includes(eventContent.slug)) {
      return;
    }

    let isTrackAvailable = true;

    // some conferences may provide availableTracks: Array<string>
    if (availableTracks) {
      isTrackAvailable = availableTracks.includes(eventContent.trackTitle);
    }

    const correctDiscordLink = isAuth ? chatLinkAuth : chatLink;
    const payload = {
      data: {
        ...eventContent,
        /* TODO: switch to real date */
        date: eventContent.date || eventContent.track,
      },
      isAuth,
      name: 'any-room',
      link:
        eventContent.roomLink ||
        eventContent.discussionRoomLink ||
        eventContent.additionalLink ||
        correctDiscordLink,
    };

    if (
      eventContent.isQaEvent ||
      eventContent.eventType === 'PanelDiscussion'
    ) {
      payload.isAuth = true;
      payload.link = isAuth ? chatLinkAuth : chatLink;
    }

    if (eventContent.speaker && isTrackAvailable && speakers) {
      const speakerData = speakers.main.find((s) => {
        return (
          s.name.trim().toLowerCase() ===
          eventContent.speaker.trim().toLowerCase()
        );
      });

      payload.name = 'speaker-card';
      payload.data = speakerData;
    }

    // TODO make type_id for events in db schema

    if (
      !eventContent.roomLink &&
      !eventContent.discussionRoomLink &&
      !eventContent.speaker &&
      !correctDiscordLink
    ) {
      payload.isAuth = true;
    }

    if (eventContent.lightningTalks && isTrackAvailable) {
      payload.name = 'lightning-talks';
    }

    trackGAEvent('TT', 'CL', payload?.data?.slug, isAuth);

    console.log('payload', payload);
    bus.clickEvent(payload);
  };

  return (
    <Container>
      <Aside schedule={schedule} customTracks={customTracks} />
      <TracksContent
        timeTicks={timeTicks}
        trackWidth={trackWidth}
        calcPosition={calcPosition}
      >
        {schedule.map((sch, i) => (
          <Track
            key={`${sch.title}-${i}`}
            track={sch}
            calcPosition={calcPosition}
            onClick={handleClick}
          />
        ))}
        {customTracks.map((tr, i) => (
          <Track
            key={`${tr.title}-${i}`}
            track={tr}
            calcPosition={calcPosition}
            onClick={handleClick}
          />
        ))}
      </TracksContent>
    </Container>
  );
};

export default App;
