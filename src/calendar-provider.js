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
    if (calendarEventName && conferenceStart && conferenceEnd) {
      return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${conferenceStart}&end=${conferenceEnd}&title=${calendarEventName}${
        description ? `&description=${description}` : ''
      }&timezone=Europe/London&all_day_event=true`;
    }

    return null;
  }
};

export const getWorkshopCalendarLink = (
  { title, isoDate, duration },
  calendarEventDescription,
) => {
  return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${isoDate}&duration=${
    duration * 60
  }&title=${title}${
    calendarEventDescription ? `&description=${calendarEventDescription}` : ''
  }&timezone=Europe/London&alarm=15`;
};
