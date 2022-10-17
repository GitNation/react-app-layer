import React from 'react';
import Container from './Container';
import Aside from './Aside';
import TracksContent from './TracksContent';
import Track from './Track';
import { createTimeTicks, calcPositionFromTime } from './model';
import { trackGAEvent } from '../services/ga';

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
    customTracks: defaultCustomTracks,
    schedule: defaultSchedule,
    scheduleOffline,
    //HARDCODE JSN / RS
    isOfflineTimeTrack = false,
    isOfflineJSNTimeTrack = false,
    eventInfo,
    isAuth,
    availableTracks,

    speakers,
  } = content;

  let schedule = defaultSchedule;
  let customTracks = defaultCustomTracks;

  // HARDCODE RS 2022
  if (isOfflineTimeTrack) {
    schedule = [scheduleOffline[0], scheduleOffline[1]];
    customTracks = [scheduleOffline[2], scheduleOffline[3]];
  }
  // HARDCODE JSN 2022
  if (isOfflineJSNTimeTrack) {
    schedule = [scheduleOffline[0], scheduleOffline[1]];
    customTracks = [scheduleOffline[2]];
  }

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

  const groupedMainTracks = schedule.reduce((resultTracks, currentTrack) => {
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
  }, []);

  const {
    chatLink,
    chatLinkAuth,
    conferenceStart: defaultStartTime,
    conferenceFinish: endTime,
  } = eventInfo;

  let startTime = defaultStartTime;
  // HARDCODE RS 2022
  if (isOfflineTimeTrack) {
    startTime = '2022-06-17T06:00:00+00:00';
  }
  // HARDCODE JSN 2022
  if (isOfflineJSNTimeTrack) {
    startTime = '2022-06-16T04:00:00+00:00';
  }

  const timeTicks = createTimeTicks(startTime, endTime);
  const calcPosition = calcPositionFromTime(startTime);
  const trackWidth = calcPosition({ isoDate: endTime });

  const handleClick = (eventContent) => {
    // HARDCODE RS 2022
    if (isOfflineTimeTrack) {
      return;
    }
    // HARDCODE JSN 2022
    if (isOfflineJSNTimeTrack) {
      return;
    }

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
        {groupedMainTracks.map((sch, i) => (
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
