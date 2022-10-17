import React from 'react';
import {
  PopSpeaker,
  PopSpeakerTop,
  PopSpeakerAvatarWrap,
  PopSpeakerAvatar,
  PopSpeakerDesc,
  PopSpeakerName,
  PopSpeakerCompany,
  PopSpeakerBio,
  PopSpeakerBtn,
  PopSpeakerMid,
  WorkshopInfoContainer,
  WorkshopInfoTitle,
  WorkshopPopBio,
  WorkshopButtonContainer,
} from './SpeakerCard.styled';

function WorkshopCard(props) {
  const { content, closeCard } = props;

  const person = content.data.speaker;

  return (
    <PopSpeaker id={`popup-${person.slug}`}>
      <PopSpeakerTop>
        <PopSpeakerAvatarWrap>
          <PopSpeakerAvatar src={person.avatar.url} alt={person.name} />
        </PopSpeakerAvatarWrap>
        <PopSpeakerDesc>
          <PopSpeakerName>{content.data.title}</PopSpeakerName>
          <PopSpeakerCompany>{person.name}</PopSpeakerCompany>
          <WorkshopPopBio
            dangerouslySetInnerHTML={{
              __html: content.data.description,
            }}
          />
        </PopSpeakerDesc>
      </PopSpeakerTop>

      {content.data.content && content.data.content.length > 0 ? (
        <WorkshopInfoContainer>
          <WorkshopInfoTitle>
            <PopSpeakerCompany>Table of contents</PopSpeakerCompany>
          </WorkshopInfoTitle>

          <PopSpeakerBio>
            <ul>
              {content.data.content.map((data) => (
                <li key={data.name}>- {data}</li>
              ))}
            </ul>
          </PopSpeakerBio>
        </WorkshopInfoContainer>
      ) : null}
      {content.data.prerequisites ? (
        <WorkshopInfoContainer>
          <WorkshopInfoTitle>
            <PopSpeakerCompany>Prerequisites</PopSpeakerCompany>
          </WorkshopInfoTitle>

          <PopSpeakerBio
            dangerouslySetInnerHTML={{
              __html: content.data.prerequisites,
            }}
          />
        </WorkshopInfoContainer>
      ) : null}
      {content.data.level ? (
        <WorkshopInfoContainer>
          <WorkshopInfoTitle>
            <PopSpeakerCompany>Workshop level</PopSpeakerCompany>
          </WorkshopInfoTitle>

          <PopSpeakerBio>{content.data.level}</PopSpeakerBio>
        </WorkshopInfoContainer>
      ) : null}
      {content.data.location ? (
        <WorkshopInfoContainer>
          <WorkshopInfoTitle>
            <PopSpeakerCompany>Workshop schedule & location</PopSpeakerCompany>
          </WorkshopInfoTitle>

          <PopSpeakerBio
            dangerouslySetInnerHTML={{
              __html: content.data.location,
            }}
          />
        </WorkshopInfoContainer>
      ) : null}

      <WorkshopButtonContainer>
        {content.data.includedToPackage ? (
          <PopSpeakerBtn
            href={content.pagesPieceOfTexts.workshopsList__freeLink || ''}
            onClick={closeCard}
          >
            Buy full ticket
          </PopSpeakerBtn>
        ) : (
          <PopSpeakerBtn
            href={content.pagesPieceOfTexts.workshopsList__proLink || ''}
            onClick={closeCard}
          >
            Buy Pro Workshop
          </PopSpeakerBtn>
        )}
      </WorkshopButtonContainer>
    </PopSpeaker>
  );
}

export default WorkshopCard;
