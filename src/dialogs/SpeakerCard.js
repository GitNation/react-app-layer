import React from 'react';
import styled from 'styled-components';

const socialTitle = {
  tw: 'Twitter',
  gh: 'Github',
  med: 'Medium',
  site: 'Site',
  default: 'Link',
};

const ADD_EVENT_ID = 'aypbtNBcPzBIdDvukmvT46093';
const TIMEZONE = 'Europe/Amsterdam';
const FallbackStart = '2020-06-18 15:00';

const fallbackTechColor = 'white';

const ActivityInfo = styled.div`
  color: ${({ color }) => color};
  border-left: 3px solid ${({ color }) => color};
`;

const selectQALink = (person) => {
  try {
    return person.activities.talks[0].extension.qaLink;
  } catch (err) {
    return null;
  }
};

{
  /* <a href="https://www.addevent.com/dir/?client=CLIENT&start=start&end=end&title=title&timezone=timezone">Add to Calendar</a> */
  /* https://www.addevent.com/dir/?client=aypbtNBcPzBIdDvukmvT46093&start=07%2F01%2F2020+09%3A00+AM&end=07%2F01%2F2020+11%3A00+AM&title=Title+of+the+event&description=Description+of+the+event&location=1600+Amphitheatre+Pkwy%2C+Mountain+View%2C+CA+94043&timezone=America%2FLos_Angeles */
}

const createDateTime = (isoDate, time) => {
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

const createEventTitle = (speaker, talk) => {
  try {
    return `${speaker.name} - ${talk.title} at JSNation Live`;
  } catch (err) {
    return 'JSNation Live Conference';
  }
};

/*


https://www.addevent.com/dir/?client=aypbtNBcPzBIdDvukmvT46093&start=2020-06-18%2015:00&duration=20&title=JSNation%20Live%20Conference&timezone=europe/amsterdam%22

*/

const createCalendarLink = (speaker) => {
  const talk = speaker.activities.talks[0];
  try {
    const start = createDateTime(talk.isoDate, talk.time);
    const title = createEventTitle(speaker, talk);

    return `https://www.addevent.com/dir/?client=${ADD_EVENT_ID}&start=${start}&duration=${talk.duration}&title=${title}&timezone=${TIMEZONE}&alarm=15`;
  } catch (err) {
    return null;
  }
};

function SpeakerCard({ type, content, status }) {
  const person = content.data;
  const qaLink = selectQALink(person);
  const calendarLink = createCalendarLink(person);

  const techColor =
    person.tagBG && person.tagBG !== 'black' ? person.tagBG : fallbackTechColor;

  return (
    <div
      className="pop-speaker"
      id={`popup-${person.slug}`}
      style={{ display: 'block' }}
    >
      <div className="pop-speaker__top">
        <div className="pop-speaker__avatar-wrap">
          <img
            className="pop-speaker__avatar"
            src={person.avatar}
            alt={person.name}
          />
        </div>
        <div className="pop-speaker__desc">
          <h4 className="pop-speaker__name">{person.name}</h4>
          <p className="pop-speaker__company">{person.company}</p>
          <div
            className="pop-speaker__bio"
            dangerouslySetInnerHTML={{
              __html: person.bio,
            }}
          />
        </div>

        <div className="pop-speaker__socials">
          {qaLink ? (
            <a
              className="btn btn--border-transparent"
              href={qaLink}
              target="_blanc"
              rel="noopener noreferrer"
            >
              JOIN SPEAKER'S VIDEO ROOM
            </a>
          ) : null}
          {person.socials &&
            person.socials.map((soc) => (
              <a
                key={soc.link}
                className="btn btn--border-transparent"
                href={soc.link}
                target="_blanc"
                rel="noopener noreferrer"
              >
                {/* {mixins.icon(social.icon)}  */}
                {socialTitle[soc.icon] || socialTitle.default}
              </a>
            ))}
        </div>
      </div>

      {person.activities && person.activities.talks ? (
        <div className="pop-speaker__mid">
          {person.activities.talks.map((talk) => (
            <React.Fragment key={talk.title}>
              <ActivityInfo
                className="pop-speaker__activity-info"
                color={techColor}
              >
                <span>{talk.label}</span>
                <span>{talk.track.name}</span>
                <span title="time is shown for the conference timezone">{talk.timeString}</span>
              </ActivityInfo>
              <h4 className="pop-speaker__activity-title">{talk.title}</h4>
              <div
                className="pop-speaker__activity-desc"
                dangerouslySetInnerHTML={{
                  __html: talk.description,
                }}
              />

              {calendarLink ? (
                <a
                  title="Add Talk to Calendar"
                  className="pop-speaker__btn btn btn--border-transparent"
                  href={calendarLink}
                  target="_blanc"
                  rel="noopener noreferrer"
                >
                  Add Talk to Calendar
                  {/* <!-- <span className="start">06/29/2020 08:00 AM</span>
                      <span className="end">06/29/2020 10:00 AM</span>
                      <span className="timezone">America/Los_Angeles</span>
                      <span className="title">Summary of the event</span>
                      <span className="description">Description of the event</span>
                      <span className="location">Location of the event</span> --> */}
                </a>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default SpeakerCard;
