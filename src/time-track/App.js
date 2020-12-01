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
    eventInfo,
    isAuth,
    availableTracks,

    speakers,
  } = content;

  const groupedCustomTracks = customTracks.reduce(
    (resultTracks, currentTrack) => {
      const separatedTracks = currentTrack.list.reduce((tracksMap, event) => {
        const result = { ...tracksMap };

        if (result[event.subTrackIndex]) {
          result[event.subTrackIndex].list.push(event);
        } else {
          result[event.subTrackIndex] = {
            ...currentTrack,
            isPrimaryTrack: event.subTrackIndex === 'default',
            list: [event],
          };
        }

        return result;
      }, {});

      return [...resultTracks, ...Object.values(separatedTracks)];
    },
    [],
  );

  const {
    discordLink,
    chatLink,
    chatLinkAuth,
    conferenceStart: startTime,
    conferenceFinish: endTime,
  } = eventInfo;
  const timeTicks = createTimeTicks(startTime, endTime);
  const calcPosition = calcPositionFromTime(startTime);
  const trackWidth = calcPosition(endTime);

  const handleClick = (eventContent) => {
    let isTrackAvailable = true;

    // some conferences may provide availableTracks: Array<string>
    if (availableTracks) {
      isTrackAvailable = availableTracks.includes(eventContent.trackTitle);
    }

    const payload = {
      data: {
        ...eventContent,
        /* TODO: switch to real date */
        date: eventContent.date || eventContent.track,
      },
      isAuth,
      name: 'any-room',
      link:
        eventContent.roomLink || eventContent.discussionRoomLink || discordLink,
    };

    if (eventContent.isQaEvent) {
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
      !discordLink
    ) {
      payload.isAuth = true;
    }

    bus.clickEvent(payload);
  };

  return (
    <Container>
      <Aside schedule={schedule} customTracks={groupedCustomTracks} />
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
        {groupedCustomTracks.map((tr, i) => (
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
