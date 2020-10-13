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

const createEventTitle = (speaker, talk, eventName) => {
  try {
    return `${speaker.name} - "${talk.title}"${
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
    const start = createDateTime(talk.isoDate, talk.time);
    const title = createEventTitle(speaker, talk, calendarEventName);

    return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${start}&duration=${
      talk.duration
    }&title=${title}${
      calendarEventDescription ? `&description=${calendarEventDescription}` : ''
    }&timezone=${TIMEZONE}&alarm=15`;
  } catch (err) {
    // Fallback whole day event
    if (calendarEventName && conferenceStart && conferenceEnd) {
      const start = createDateTime(conferenceStart);
      const end = createDateTime(conferenceEnd);

      return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${start}&end=${end}&title=${calendarEventName}${
        calendarEventDescription
          ? `&description=${calendarEventDescription}`
          : ''
      }&timezone=${TIMEZONE}&all_day_event=true`;
    }

    return null;
  }
};
