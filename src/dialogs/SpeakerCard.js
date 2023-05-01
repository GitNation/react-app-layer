import React, { useState, useCallback } from 'react';
import dayjs from 'dayjs';
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
  PopSpeakerWrapper,
} from './SpeakerCard.styled';

const socialTitle = {
  tw: 'Twitter',
  gh: 'Github',
  med: 'Medium',
  site: 'Site',
  default: 'GitNation Portal',
};

const fallbackTechColor = 'white';

const selectQALink = (person) => {
  try {
    return person.activities.talks[0].extension.qaLink;
  } catch (err) {
    return null;
  }
};

function SpeakerCard(props) {
  const {
    type,
    content,
    isOfflineCard,
    hideLabel,
    calendarLinkOptions,
  } = props;
  const [minHeightTalkDesc, setMinHeightTalkDesc] = useState(0);
  const socialBtnRef = useCallback((node) => {
    if (node !== null && window.matchMedia('(min-width: 600px)').matches) {
      setMinHeightTalkDesc(node.getBoundingClientRect().height);
    }
  }, []);

  const { data } = content;
  const speakers = data.speakers || [content.data];
  const calendarLink = createCalendarLink(speakers, data.activities, calendarLinkOptions);

  const techColor =
    speakers[0]?.tagBG && speakers[0].tagBG !== 'black' ? speakers[0].tagBG : fallbackTechColor;

  const slug = speakers.map(s => s.slug).join('-');
  return (
    <PopSpeaker id={`popup-${slug}`}>
      {speakers.length > 0 && speakers.some(s => !!s.name) && (
        <PopSpeakerTop>
          {
            speakers.map((person, i) => (
              <PopSpeakerWrapper key={i}>
                {person.avatar && (
                  <PopSpeakerAvatarWrap>
                    <PopSpeakerAvatar src={person.avatar} alt={person.name} />
                  </PopSpeakerAvatarWrap>
                )}

                <PopSpeakerDesc>
                  <PopSpeakerName>{person.name}</PopSpeakerName>
                  <PopSpeakerCompany>{person.company}</PopSpeakerCompany>
                  <PopSpeakerBio
                    dangerouslySetInnerHTML={{
                      __html: person.bio,
                    }}
                  />
                </PopSpeakerDesc>

                {person.socials && (
                  <PopSpeakerSocials>
                    <div ref={socialBtnRef}>
                      {person.socials.map((soc) => (
                        <PopSpeakerBtn
                          key={soc.link}
                          href={soc.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socialTitle[soc.icon] || socialTitle.default}
                        </PopSpeakerBtn>
                      ))}
                    </div>
                  </PopSpeakerSocials>
                )}
              </PopSpeakerWrapper>
            ))
          }
        </PopSpeakerTop>
      )}

      <PopSpeakerMid minHeight={minHeightTalkDesc}>
        {!isOfflineCard && data.activities && data.activities.talks
          ? data.activities.talks.map((talk) => {
              const showInfo = talk.label || talk.track || talk.timeString;
              return (
                <React.Fragment key={talk.title}>
                  {showInfo && (
                    <PopSpeakerActivityInfo color={techColor}>
                      <span>{!hideLabel ? talk.label : null}</span>
                      {talk.track && <span>{talk.track.name}</span>}
                      {talk.timeString && (
                        <span title="time is show in your local browser tme">
                          {dayjs(talk.timeString).format('HH:mm')}
                        </span>
                      )}
                    </PopSpeakerActivityInfo>
                  )}
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
              );
            })
          : null}
        {isOfflineCard && data.activities && data.activities.offlineTalks
          ? data.activities.offlineTalks.map((talk) => {
              const showInfo = talk.label || talk.track || talk.timeString;
              return (
                <React.Fragment key={talk.title}>
                  {showInfo && (
                    <PopSpeakerActivityInfo color={techColor}>
                      <span>{!hideLabel ? talk.label : null}</span>
                      {talk.track && <span>{talk.track.name}</span>}
                      {talk.timeString && (
                        <span title="time is show in your local browser tme">
                          {dayjs(talk.timeString).format('HH:mm')}
                        </span>
                      )}
                    </PopSpeakerActivityInfo>
                  )}
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
              );
            })
          : null}
      </PopSpeakerMid>
    </PopSpeaker>
  );
}

export default SpeakerCard;
