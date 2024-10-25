const ADD_EVENT_ID = 'aypbtNBcPzBIdDvukmvT46093';
import { DateTime } from 'luxon';

const createEventTitle = (speakers, talk, eventName) => {
  const speakersStr = speakers.map((s) => s.name).join(', ');
  try {
    return `${speakersStr || ''}${speakersStr ? ' - ' : ''}"${talk.title}"${
      eventName ? ` at ${eventName}` : ''
    }`;
  } catch (err) {
    return eventName;
  }
};

export const createCalendarLink = (
  speakers,
  activities,
  {
    calendarEventDescription,
    calendarEventName,
    conferenceStart,
    conferenceEnd,
  },
) => {
  const description = encodeURIComponent(calendarEventDescription);

  try {
    const talk = activities && activities.allTalks[0];
    const title = encodeURIComponent(
      createEventTitle(speakers, talk, calendarEventName),
    );

    const localDate = DateTime.fromISO(talk.isoDate || talk.timeString);
    return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${localDate.toFormat(
      'yyyy/MM/dd HH:mm',
    )}&duration=${talk.duration}&title=${title}${
      description ? `&description=${description}` : ''
    }&timezone=${localDate.zoneName}&alarm=15`;
  } catch (err) {
    // Fallback whole day event
    const localDateEventStart = DateTime.fromISO(conferenceStart);
    const localDateEventEnd = DateTime.fromISO(conferenceEnd);
    if (calendarEventName && conferenceStart && conferenceEnd) {
      return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${localDateEventStart.toFormat(
        'yyyy/MM/dd HH:mm',
      )}&end=${localDateEventEnd.toFormat(
        'yyyy/MM/dd HH:mm',
      )}&title=${calendarEventName}${
        description ? `&description=${description}` : ''
      }&timezone=${localDateEventStart.zoneName}&all_day_event=true`;
    }

    return null;
  }
};

export const getWorkshopCalendarLink = (
  { title, isoDate, duration },
  calendarEventDescription,
) => {
  const localDate = DateTime.fromISO(isoDate);
  const encodedTitle = encodeURIComponent(`Workshop: ${title}`);
  const description = encodeURIComponent(calendarEventDescription);
  return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${localDate.toFormat(
    'yyyy/MM/dd HH:mm',
  )}&duration=${duration * 60}&title=${encodedTitle}${
    calendarEventDescription ? `&description=${description}` : ''
  }&timezone=${localDate.zoneName}&alarm=15`;
};

export const getLightningTalksCalendarLink = ({
  title,
  isoDate,
  duration,
  lightningTalks,
}) => {
  const localDate = DateTime.fromISO(isoDate);
  const encodedTitle = encodeURIComponent(`${title}`);

  const description = encodeURIComponent(
    lightningTalks.reduce((acc, cur) => {
      const speakers = cur.speakers
        ? cur.speakers.map((s) => s.name).join(', ')
        : cur.speaker;
      const next = `"${cur.title}" by ${speakers}`;
      if (acc) {
        return `${acc}, ${next}`;
      }

      return next;
    }, ''),
  );

  return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${localDate.toFormat(
    'yyyy/MM/dd HH:mm',
  )}&duration=${duration}&title=${encodedTitle}${
    lightningTalks.length ? `&description=${description}` : ''
  }&timezone=${localDate.zoneName}&alarm=15`;
};
