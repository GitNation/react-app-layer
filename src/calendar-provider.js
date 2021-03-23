const ADD_EVENT_ID = 'aypbtNBcPzBIdDvukmvT46093';
import { DateTime } from 'luxon';

const createEventTitle = (speaker, talk, eventName) => {
  try {
    return `${speaker.name || ''}${speaker.name ? ' - ' : ''}"${talk.title}"${
      eventName ? ` at ${eventName}` : ''
    }`;
  } catch (err) {
    return eventName;
  }
};

export const createCalendarLink = (
  speaker,
  {
    calendarEventDescription,
    calendarEventName,
    conferenceStart,
    conferenceEnd,
  },
) => {
  const description = encodeURIComponent(calendarEventDescription);

  try {
    const talk = speaker.activities && speaker.activities.talks[0];
    const title = encodeURIComponent(
      createEventTitle(speaker, talk, calendarEventName),
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
