import React from 'react';

import { createCalendarLink } from '../calendar-provider';
import {
  PopSpeaker,
  PopSpeakerTop,
  PopSpeakerAvatarWrap,
  PopSpeakerAvatar,
  PopSpeakerDesc,
  PopSpeakerName,
  PopSpeakerCompany,
  PopSpeakerBio,
  PopSpeakerSocials,
  PopSpeakerBtn,
  PopSpeakerMid,
  PopSpeakerActivityInfo
} from './styled';

const socialTitle = {
  tw: 'Twitter',
  gh: 'Github',
  med: 'Medium',
  site: 'Site',
  default: 'Link',
};

const fallbackTechColor = 'white';

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
  const calendarLink = createCalendarLink(person);

  const techColor =
    person.tagBG && person.tagBG !== 'black' ? person.tagBG : fallbackTechColor;

  return (
    <PopSpeaker id={`popup-${person.slug}`}>
      <PopSpeakerTop>
        <PopSpeakerAvatarWrap>
          <PopSpeakerAvatar
            src={person.avatar}
            alt={person.name}
          />
        </PopSpeakerAvatarWrap>
        <PopSpeakerDesc>
          <PopSpeakerName addMobileMargin>
            {person.name}
          </PopSpeakerName>
          <PopSpeakerCompany>
            {person.company}
          </PopSpeakerCompany>
          <PopSpeakerBio
            dangerouslySetInnerHTML={{
              __html: person.bio,
            }}
          />
        </PopSpeakerDesc>

        <PopSpeakerSocials>
          {qaLink ? (
            <PopSpeakerBtn
              href={qaLink}
              target="_blanc"
              rel="noopener noreferrer"
            >
              JOIN SPEAKER'S VIDEO ROOM
            </PopSpeakerBtn>
          ) : null}
          {person.socials &&
            person.socials.map((soc) => (
              <PopSpeakerBtn
                key={soc.link}
                href={soc.link}
                target="_blanc"
                rel="noopener noreferrer"
              >
                {/* {mixins.icon(social.icon)}  */}
                {socialTitle[soc.icon] || socialTitle.default}
              </PopSpeakerBtn>
            ))}
        </PopSpeakerSocials>
      </PopSpeakerTop>

      {person.activities && person.activities.talks ? (
        <PopSpeakerMid>
          {person.activities.talks.map((talk) => (
            <React.Fragment key={talk.title}>
              <PopSpeakerActivityInfo color={techColor}>
                { talk.label && <span>{talk.label}</span> }
                { talk.track.name && <span>{talk.track.name}</span> }
                { talk.timeString && (<span title="time is shown for the conference timezone">{talk.timeString}</span>) }
              </PopSpeakerActivityInfo>
              <PopSpeakerName>
                {talk.title}
              </PopSpeakerName>
              <PopSpeakerBio
                dangerouslySetInnerHTML={{
                  __html: talk.description,
                }}
              />
            </React.Fragment>
          ))}
        </PopSpeakerMid>
      ) : null}
    </PopSpeaker>
  );
}

export default SpeakerCard;
