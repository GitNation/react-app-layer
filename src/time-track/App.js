import React from 'react';
import Container from './Container';
import Aside from './Aside';
import TracksContent from './TracksContent';
import Track from './Track';
import { createTimeTicks, calcPositionFromTime } from './model';

const App = ({ bus }) => {
  const content = bus.getContent();
  const {
    customTracks,
    schedule,
    scheduleExtends,
    eventInfo,
    isAuth,
    isCustomTrackAvailable,
    availableTracks,
    chatLink,
    chatLinkAuth,
    speakers,
  } = content;

  const startTime = eventInfo.conferenceStart;
  const endTime = eventInfo.conferenceFinish;
  const { discordLink } = eventInfo;
  const timeTicks = createTimeTicks(startTime, endTime);
  const calcPosition = calcPositionFromTime(startTime);
  const trackWidth = calcPosition(endTime);

  const handleClick = (eventContent) => {
    const isTrackAvailable = availableTracks.includes(eventContent.trackTitle);
    const payload = {
      data: {
        ...eventContent,
        /* TODO: switch to real date */
        date: eventContent.date || eventContent.track,
      },
      isAuth,
      name: 'any-room',
      link:
        eventContent.speakerRoomLink ||
        eventContent.discussionRoomLink ||
        discordLink,
    };

    if (eventContent.isQaEvent) {
      payload.isAuth = true;

      payload.link = isAuth && isCustomTrackAvailable ? chatLinkAuth : chatLink;
    }

    if (eventContent.speaker && isTrackAvailable) {
      const speakerData = speakers.main.find(
        (s) => s.name === eventContent.speaker,
      );

      payload.name = 'speaker-card';
      payload.data = speakerData;
    }

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
