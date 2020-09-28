const ADD_EVENT_ID = 'aypbtNBcPzBIdDvukmvT46093';
const TIMEZONE = 'Europe/Amsterdam';

const createDateTime = (isoDate, time) => {
  const d = new Date(isoDate);
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  return `${yyyy}-${mm}-${dd}${time ? ` ${time}` : ''}`;
};

const createEventTitle = (speaker, talk, eventName) => {
  try {
    return `${speaker.name} - "${talk.title}" at ${eventName}`;
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
  const talk = speaker.activities && speaker.activities.talks[0];
  try {
    const start = createDateTime(talk.isoDate, talk.time);
    const title = createEventTitle(speaker, talk, calendarEventName);

    return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${start}&duration=${talk.duration}&title=${title}&description=${calendarEventDescription}&timezone=${TIMEZONE}&alarm=15`;
  } catch (err) {
    // Fallback whole day event
    if (calendarEventName && conferenceStart && conferenceEnd) {
      const start = createDateTime(conferenceStart);
      const end = createDateTime(conferenceEnd);

      return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${start}&end=${end}&title=${calendarEventName}&description=${calendarEventDescription}&timezone=${TIMEZONE}&all_day_event=true`;
    }

    return null;
  }
};
