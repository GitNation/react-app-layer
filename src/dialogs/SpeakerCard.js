import React from 'react';

const socialTitle = {
  tw: 'Twitter',
  gh: 'Github',
  med: 'Medium',
  site: 'Site',
  default: 'Link',
};

const selectQALink = (person) => {
  try {
    return person.activities.talks[0].extension.qaLink;
  } catch (err) {
    return null;
  }
};

function SpeakerCard({ type, content, status }) {
  const person = content.data;
  const qaLink = selectQALink(person);

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
            <a className="btn btn--border-transparent" href={qaLink}>
              JOIN SPEAKER'S VIDEO ROOM
            </a>
          ) : null}
          {person.socials &&
            person.socials.map((soc) => (
              <a
                key={soc.link}
                className="btn btn--border-transparent"
                href={soc.link}
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
              <div className="pop-speaker__activity-info">
                <span>{talk.label}</span>
                <span>{talk.track.name}</span>
                <span>{talk.timeString}</span>
              </div>
              <h4 className="pop-speaker__activity-title">{talk.title}</h4>
              <div
                className="pop-speaker__activity-desc"
                dangerouslySetInnerHTML={{
                  __html: talk.description,
                }}
              />

              <div
                title="Add Talk to Calendar"
                className="pop-speaker__btn btn btn--border-transparent"
              >
                Add Talk to Calendar
                {/* <!-- <span className="start">06/29/2020 08:00 AM</span>
                <span className="end">06/29/2020 10:00 AM</span>
                <span className="timezone">America/Los_Angeles</span>
                <span className="title">Summary of the event</span>
                <span className="description">Description of the event</span>
                <span className="location">Location of the event</span> --> */}
              </div>
            </React.Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default SpeakerCard;
