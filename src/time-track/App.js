import React from 'react';
import Container from './Container';
import Aside from './Aside';
import TracksContent from './TracksContent';
import Track from './Track';
import { createTimeTicks, calcPositionFromTime } from './model';
import { mergeSchedule } from './magic';

const App = ({ bus }) => {
  const content = bus.getContent();
  const {
    customTracks,
    schedule,
    scheduleExtends,
    isAuth,
    eventInfo,
  } = content;
  const startTime = eventInfo.conferenceStart;
  const endTime = eventInfo.conferenceFinish;
  const { discordLink } = eventInfo;
  const timeTicks = createTimeTicks(startTime, endTime);
  const calcPosition = calcPositionFromTime(startTime);
  const trackWidth = calcPosition(endTime);
  const mSchedule = mergeSchedule(schedule);

  const handleClick = (eventContent) => {
    const payload = {
      data: {
        ...eventContent,
        /* TODO: switch to real date */
        date: eventContent.date || eventContent.track,
      },
      isAuth,
      name: 'any-room',
      link: eventContent.qaLink || eventContent.speakerRoomLink || discordLink,
    };
    bus.clickEvent(payload);
  };

  return (
    <Container>
      <Aside schedule={mSchedule} customTracks={customTracks} />
      <TracksContent
        timeTicks={timeTicks}
        trackWidth={trackWidth}
        calcPosition={calcPosition}
      >
        {mSchedule.map((sch) => (
          <Track
            track={sch}
            calcPosition={calcPosition}
            onClick={handleClick}
          />
        ))}
        {customTracks.map((tr) => (
          <Track track={tr} calcPosition={calcPosition} onClick={handleClick} />
        ))}
      </TracksContent>
    </Container>
  );
};

export default App;
