const ADD_EVENT_ID = 'aypbtNBcPzBIdDvukmvT46093';
const TIMEZONE = 'Europe/Amsterdam';

const createDateTime = (isoDateWithoutTime, time) => {
  const d = new Date(isoDateWithoutTime);
  // get date always in original time zone
  d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  return `${yyyy}-${mm}-${dd}${time ? ` ${time}` : ''}`;
};

const createEventTitle = (speaker, eventName) => {
  try {
    return `${speaker.name || ''}${speaker.name ? ' - ' : ''}"${title}"${
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
  try {
    const talk = speaker.activities && speaker.activities.talks[0];
    const title = createEventTitle(speaker, calendarEventName);

    return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${
      talk.isoDate || talk.timeString
    }&duration=${talk.duration}&title=${title}${
      calendarEventDescription ? `&description=${calendarEventDescription}` : ''
    }&timezone=Europe/London&alarm=15`;
  } catch (err) {
    // Fallback whole day event
    if (calendarEventName && conferenceStart && conferenceEnd) {
      return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${conferenceStart}&end=${conferenceEnd}&title=${calendarEventName}${
        calendarEventDescription
          ? `&description=${calendarEventDescription}`
          : ''
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
