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

const getGroupedTracks = (tracks) =>
  tracks.reduce((resultTracks, currentTrack) => {
    const separatedTracks = currentTrack.list.reduce((tracksMap, event) => {
      const result = { ...tracksMap };

      if (result[event.subTrackIndex]) {
        result[event.subTrackIndex].list.push(event);
      } else {
        result[event.subTrackIndex] = {
          ...currentTrack,
          isPrimaryTrack: event.subTrackIndex === 'default',
          title:
            event.subTrackIndex === 'default' || !event.subTrackIndex
              ? currentTrack.title
              : '',
          list: [event],
        };
      }

      return result;
    }, {});

    return [...resultTracks, ...Object.values(separatedTracks)];
  }, []);

const getFlatTrackList = (tracksList) =>
  tracksList.reduce((result, item) => {
    if (Array.isArray(item.list)) {
      return result.concat(getFlatTrackList(item.list));
    }
    return result.concat(item);
  }, []);
}

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

    emsSchedule,
    emsScheduleOffline,
  } = content;

  let schedule = defaultSchedule;
  let customTracks = defaultCustomTracks;

  let formattedMainTracks = [];
  let formattedCustomTracks = [];
  // todo: add generic function
  if(emsSchedule || emsScheduleOffline) {
    const [firstDayCommunityTrack, firstDayResidentsTrack] = emsSchedule[0].list;
    const [secondDayCommunityTrack, secondDayResidentsTrack] = emsSchedule[1].list;

    schedule = [
      {
        // 1st is community track
        title: firstDayCommunityTrack.track,
        list: getFlatTrackList(firstDayCommunityTrack.list.concat(secondDayCommunityTrack.list)),
      },
      {
        // 2nd is residents track
        title: firstDayResidentsTrack.track,
        list: getFlatTrackList(firstDayResidentsTrack.list.concat(secondDayResidentsTrack.list)),
      },
    ];

    // HARDCODE JSN/RS 2023 (show offline schedule of either sOfflineTimeTrack || isOfflineJSNTimeTrack is true)
    if ((isOfflineTimeTrack || isOfflineJSNTimeTrack) && emsScheduleOffline) {
      const [firstDayCommunityTrack, firstDayResidentsTrack] = emsScheduleOffline[0].list;

      schedule = [
        {
          // 1st is community track
          title: firstDayCommunityTrack.track,
          list: getFlatTrackList(firstDayCommunityTrack.list),
        },
        {
          // 2nd is residents track
          title: firstDayResidentsTrack.track,
          list: getFlatTrackList(firstDayResidentsTrack.list),
        },
      ];
      // hide custom customTracks for offline conference
      customTracks = [];
    }
    formattedMainTracks = schedule;
    formattedCustomTracks = customTracks;
  } else {
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

    formattedMainTracks = getGroupedTracks(schedule);
    formattedCustomTracks = getGroupedTracks(customTracks);
  }

  const {
    chatLink,
    chatLinkAuth,
    conferenceStart: defaultStartTime,
    conferenceFinish: endTime,
  } = eventInfo;

  let startTime = defaultStartTime;
  // HARDCODE RS 2023
  if (isOfflineTimeTrack) {
    startTime = '2023-06-02T06:00:00+00:00';
  }
  // HARDCODE JSN 2023
  if (isOfflineJSNTimeTrack) {
    startTime = '2023-06-01T06:00:00+00:00';
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
      <Aside schedule={formattedMainTracks} customTracks={formattedCustomTracks} />
      <TracksContent
        timeTicks={timeTicks}
        trackWidth={trackWidth}
        calcPosition={calcPosition}
      >
        {formattedMainTracks.map((sch, i) => (
          <Track
            key={`${sch.title}-${i}`}
            track={sch}
            calcPosition={calcPosition}
            onClick={handleClick}
          />
        ))}
        {formattedCustomTracks.map((tr, i) => (
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
