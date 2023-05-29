import React, { useEffect } from 'react';
import { getLightningTalksCalendarLink } from '../calendar-provider';
import {
  PopSpeaker,
  PopSpeakerTitle,
  PopSpeakerBio,
  PopCalendarButton,
  LightningTalkContainer,
  PopSpeakerTop,
  PopSpeakerAvatarWrap,
  PopSpeakerAvatar,
  PopSpeakerName,
} from './SpeakerCard.styled';

function LightningTalkCard({ content: { data }, calendarLinkOptions }) {
  const calendarLink = getLightningTalksCalendarLink(data, calendarLinkOptions);
  const inputId = `input-${data.slug}`;
  useEffect(() => {
    document.getElementById(inputId).focus();
  }, []);

  return (
    <>
      <div id={inputId} style={{ height: 0 }} tabIndex="1" />
      <PopSpeaker id={`popup-${data.slug}`}>
        {data.lightningTalks &&
          data.lightningTalks.map((talk) => {
            const speaker = talk.speakers && talk.speakers.length > 0
              ? talk.speakers[0]
              : { avatar: talk.avatar.url, name: talk.speaker };
            return (
              <React.Fragment key={talk.title}>
                <PopSpeakerTop
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                  }}
                >
                  <PopSpeakerAvatarWrap>
                    <PopSpeakerAvatar
                      src={speaker.avatar}
                      alt={speaker.name}
                    />
                  </PopSpeakerAvatarWrap>
                  <PopSpeakerName>{speaker.name}</PopSpeakerName>
                </PopSpeakerTop>
                <div style={{ marginBottom: '32px' }} />
                <LightningTalkContainer>
                  <PopSpeakerTitle>{talk.title}</PopSpeakerTitle>
                  <PopSpeakerBio
                    dangerouslySetInnerHTML={{
                      __html: talk.text,
                    }}
                  />
                  <div style={{ marginBottom: '32px' }} />
                </LightningTalkContainer>
              </React.Fragment>
            );
          })}
        {calendarLink && (
          <LightningTalkContainer>
            <PopCalendarButton
              title="Add Talk to Calendar"
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Add Talks to Calendar
            </PopCalendarButton>
          </LightningTalkContainer>
        )}
      </PopSpeaker>
    </>
  );
}

export default LightningTalkCard;
