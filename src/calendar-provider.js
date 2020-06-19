const ADD_EVENT_ID = 'aypbtNBcPzBIdDvukmvT46093';
const TIMEZONE = 'Europe/Amsterdam';
const FallbackStart = '2020-06-18 15:00';


export const createDateTime = (isoDate, time) => {
  try {
    const d = new Date(isoDate);
    const yyyy = d.getFullYear();
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    return `${yyyy}-${mm}-${dd} ${time}`;
  } catch (err) {
    return FallbackStart;
  }
};

export const createEventTitle = (speaker, talk) => {
  try {
    return `${speaker.name} - ${talk.title} at JSNation Live`;
  } catch (err) {
    return 'JSNation Live Conference';
  }
};

export const createCalendarLink = (speaker) => {
  const talk = speaker.activities && speaker.activities.talks[0];
  try {
    const start = createDateTime(talk.isoDate, talk.time);
    const title = createEventTitle(speaker, talk);

    return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${start}&duration=${talk.duration}&title=${title}&timezone=${TIMEZONE}&alarm=15`;
  } catch (err) {
    return null;
  }
};
