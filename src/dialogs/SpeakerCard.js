import React, { useState, useCallback, forwardRef } from 'react';
import dayjs from 'dayjs';
import { createCalendarLink } from '../calendar-provider';
import {
  PopSpeaker,
  PopSpeakerContentWrap,
  PopSpeakerTop,
  PopSpeakerAvatarWrap,
  PopSpeakerAvatar,
  PopSpeakerDesc,
  PopSpeakerName,
  PopSpeakerCategory,
  PopSpeakerTitle,
  PopSpeakerCompany,
  PopSpeakerBio,
  PopSpeakerSocials,
  PopSpeakerBtn,
  PopSpeakerMidLeft,
  PopSpeakerMidRight,
  PopSpeakerActivityInfo,
  PopCalendarButton,
  PopSpeakerWrapper,
  PopSpeakerSocialsHeader,
  PopSpeakerMidWrapper,
  MobileOnly,
} from './SpeakerCard.styled';

const socialTitle = {
  tw: 'Twitter',
  gh: 'Github',
  med: 'Medium',
  instagram: 'Instagram',
  in: 'Linkedin',
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
  const { content, isOfflineCard, hideLabel, calendarLinkOptions } = props;

  const { data } = content;
  const speakers = data.speakers || [content.data];
  const calendarLink = createCalendarLink(
    speakers,
    data.activities,
    calendarLinkOptions,
  );

  const techColor =
    speakers[0]?.tagBG && speakers[0].tagBG !== 'black'
      ? speakers[0].tagBG
      : fallbackTechColor;

  const slug = speakers.map((s) => s.slug).join('-');
  return (
    <PopSpeaker id={`popup-${slug}`}>
      {speakers.length > 0 && speakers.some((s) => !!s.name) && (
        <PopSpeakerTop>
          {speakers.map((person, i) => (
            <PopSpeakerWrapper key={i}>
              {person.avatar && (
                <PopSpeakerAvatarWrap>
                  <PopSpeakerAvatar src={person.avatar} alt={person.name} />
                </PopSpeakerAvatarWrap>
              )}

              <PopSpeakerDesc>
                <PopSpeakerName>{person.name}</PopSpeakerName>
                <PopSpeakerCompany>
                  {person.companyWithCountry}
                </PopSpeakerCompany>
                <PopSpeakerBio
                  dangerouslySetInnerHTML={{
                    __html: person.bio,
                  }}
                />
              </PopSpeakerDesc>

              <MobileOnly>
                <SocialsBlock person={person} />
              </MobileOnly>
            </PopSpeakerWrapper>
          ))}
        </PopSpeakerTop>
      )}

      <PopSpeakerMidWrapper>
        {/* <PopSpeakerMidLeft>
          {!isOfflineCard && data.activities && data.activities.talks
            ? data.activities.talks.map((talk) => {
                if (talk.category === 2) return null;
                return (
                  <PopSpeakerContent
                    key={talk.title}
                    talk={talk}
                    techColor={techColor}
                    hideLabel={hideLabel}
                    calendarLink={calendarLink}
                  />
                );
              })
            : null}
          {isOfflineCard && data.activities && data.activities.offlineTalks
            ? data.activities.offlineTalks.map((talk) => {
                return (
                  <PopSpeakerContent
                    key={talk.title}
                    talk={talk}
                    techColor={techColor}
                    hideLabel={hideLabel}
                    calendarLink={calendarLink}
                  />
                );
              })
            : null}

          {!isOfflineCard && data.activities && data.activities.offlineTalks
            ? data.activities.offlineTalks.map((talk) => {
                if (talk.category !== 2) return null;
                return (
                  <PopSpeakerContent
                    key={talk.title}
                    talk={talk}
                    techColor={techColor}
                    hideLabel={hideLabel}
                    calendarLink={calendarLink}
                  />
                );
              })
            : null}
        </PopSpeakerMidLeft> */}

        <PopSpeakerMidLeft>
          {data.activities.allTalks
            ? data.activities.allTalks.map((talk) => {
                return (
                  <PopSpeakerContent
                    key={talk.title}
                    talk={talk}
                    techColor={techColor}
                    hideLabel={hideLabel}
                    calendarLink={calendarLink}
                  />
                );
              })
            : null}
        </PopSpeakerMidLeft>

        <PopSpeakerMidRight>
          {speakers.map((speaker, index) => {
            return (
              <SocialsBlock
                key={index}
                header={speakers.length > 1 && speaker.name}
                person={speaker}
              />
            );
          })}
        </PopSpeakerMidRight>
      </PopSpeakerMidWrapper>
    </PopSpeaker>
  );
}

const SocialsBlock = ({ header, person }) => {
  return (
    person.socials && (
      <PopSpeakerSocials>
        {header && <PopSpeakerSocialsHeader>{header}</PopSpeakerSocialsHeader>}
        <div>
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
    )
  );
};

const PopSpeakerContent = ({ talk, techColor, hideLabel, calendarLink }) => {
  const showInfo = (talk.label && !hideLabel) || talk.track || talk.timeString;
  return (
    <PopSpeakerContentWrap>
      {showInfo && (
        <PopSpeakerActivityInfo color={techColor}>
          {!hideLabel && talk.label && <span>{talk.label}</span>}
          {talk.track && <span>{talk.track.name}</span>}
          {talk.timeString && (
            <span title="time is show in your local browser tme">
              {dayjs(talk.timeString).format('HH:mm')}
            </span>
          )}
        </PopSpeakerActivityInfo>
      )}

      <PopSpeakerTitle>
        <PopSpeakerCategory>
          {talk.category == 2 ? 'Workshop: ' : 'Talk: '}
        </PopSpeakerCategory>
        {talk.title}
      </PopSpeakerTitle>
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
    </PopSpeakerContentWrap>
  );
};

export default SpeakerCard;
