import React, { useState, useCallback } from 'react';
import { createCalendarLink } from '../calendar-provider';
import {
  PopSpeaker,
  PopSpeakerTop,
  PopSpeakerAvatarWrap,
  PopSpeakerAvatar,
  PopSpeakerDesc,
  PopSpeakerName,
  PopSpeakerTitle,
  PopSpeakerCompany,
  PopSpeakerBio,
  PopSpeakerSocials,
  PopSpeakerBtn,
  PopSpeakerMid,
  PopSpeakerActivityInfo,
} from './SpeakerCard.styled';

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
  const [minHeightTalkDesc, setMinHeightTalkDesc] = useState(0);
  const socialBtnRef = useCallback((node) => {
    if (node !== null) {
      setMinHeightTalkDesc(node.getBoundingClientRect().height);
    }
  }, []);
  const person = content.data;
  const qaLink = selectQALink(person);

  const techColor =
    person.tagBG && person.tagBG !== 'black' ? person.tagBG : fallbackTechColor;

  return (
    <PopSpeaker id={`popup-${person.slug}`}>
      <PopSpeakerTop>
        <PopSpeakerAvatarWrap>
          <PopSpeakerAvatar src={person.avatar} alt={person.name} />
        </PopSpeakerAvatarWrap>
        <PopSpeakerDesc>
          <PopSpeakerName>{person.name}</PopSpeakerName>
          <PopSpeakerCompany>{person.company}</PopSpeakerCompany>
          <PopSpeakerBio
            dangerouslySetInnerHTML={{
              __html: person.bio,
            }}
          />
        </PopSpeakerDesc>

        <PopSpeakerSocials>
          {person.socials && (
            <div ref={socialBtnRef}>
              {/*{qaLink ? (*/}
              {/*  <PopSpeakerBtn*/}
              {/*    href={qaLink}*/}
              {/*    target="_blanc"*/}
              {/*    rel="noopener noreferrer"*/}
              {/*  >*/}
              {/*    JOIN SPEAKER'S VIDEO ROOM*/}
              {/*  </PopSpeakerBtn>*/}
              {/*) : null}*/}
              {person.socials.map((soc) => (
                <PopSpeakerBtn
                  key={soc.link}
                  href={soc.link}
                  target="_blanc"
                  rel="noopener noreferrer"
                >
                  {socialTitle[soc.icon] || socialTitle.default}
                </PopSpeakerBtn>
              ))}
            </div>
          )}
        </PopSpeakerSocials>
      </PopSpeakerTop>

      {person.activities && person.activities.talks ? (
        <PopSpeakerMid minHeight={minHeightTalkDesc}>
          {person.activities.talks.map((talk) => (
            <React.Fragment key={talk.title}>
              <PopSpeakerActivityInfo color={techColor}>
                {/*TODO: pass disable option*/}
                <span>{talk.label}</span>
                <span>{talk.track.name}</span>
                <span title="time is shown for the conference timezone">
                  {talk.timeString}
                </span>
              </PopSpeakerActivityInfo>
              <PopSpeakerTitle>{talk.title}</PopSpeakerTitle>
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
