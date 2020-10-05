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
  PopCalendarButton,
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

function SpeakerCard({
  type,
  content,
  status,
  hideLabel,
  calendarLinkOptions,
}) {
  const [minHeightTalkDesc, setMinHeightTalkDesc] = useState(0);
  const socialBtnRef = useCallback((node) => {
    if (node !== null && window.matchMedia('(min-width: 600px)').matches) {
      setMinHeightTalkDesc(node.getBoundingClientRect().height);
    }
  }, []);
  const person = content.data;
  const qaLink = selectQALink(person);
  const calendarLink = createCalendarLink(person, calendarLinkOptions);

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

      <PopSpeakerMid minHeight={minHeightTalkDesc}>
        {person.activities && person.activities.talks
          ? person.activities.talks.map((talk) => (
              <React.Fragment key={talk.title}>
                <PopSpeakerActivityInfo color={techColor}>
                  <span>{!hideLabel ? talk.label : null}</span>
                  <span>{talk.track.name}</span>
                  {talk.time && talk.isoDate && (
                    <span title="time is show in your local browser tme">
                      {/* Hacking dates as somehow the dataset has separate ISO date and separate non-ISO time */}
                      {new Date(
                        `${new Date(talk.isoDate).toDateString()} ${
                          talk.time
                        } GMT+0200`,
                      )
                        .toLocaleTimeString('en-GB')
                        .split(':')
                        .slice(0, 2)
                        .join(':')}
                    </span>
                  )}
                </PopSpeakerActivityInfo>
                <PopSpeakerTitle>{talk.title}</PopSpeakerTitle>
                <PopSpeakerBio
                  dangerouslySetInnerHTML={{
                    __html: talk.description,
                  }}
                />
                {talk.timeString && calendarLink ? (
                  <PopCalendarButton
                    title="Add Talk to Calendar"
                    href={calendarLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add Talk to Calendar
                  </PopCalendarButton>
                ) : null}
              </React.Fragment>
            ))
          : null}
      </PopSpeakerMid>
    </PopSpeaker>
  );
}

export default SpeakerCard;
