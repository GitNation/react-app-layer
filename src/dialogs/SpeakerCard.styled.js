import styled from 'styled-components';

export const BgHeadImg =
  'data:image/png;base64,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';

/**
 * In this document we used css variable:
 --color-popup-title
 --color-popup-button-close = #ffffff
 --color-popup-company
 --color-popup-button-text
 --color-popup-border = #5f5f5f
 --color-popup-background = #131513
 --color-popup-track-info
 --color-brand
 --color-brand-hover
 --background-popup-head-image
 */

export const PopSpeaker = styled.div`
  position: relative;
  border: 15px solid var(--color-popup-border, #5f5f5f);
  background: var(--color-popup-background, #131513);
  width: 100%;
  z-index: 100;
  display: block;
  font-family: GothamPro, Arial, sans-serif;
  font-weight: 400;
  --sideSpacing: 50px;

  @media only screen and (max-width: 767px) {
    --sideSpacing: 30px;
  }
`;

export const PopSpeakerTop = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: calc(var(--sideSpacing) / 2);
  padding: var(--sideSpacing);
  background: var(--background-popup-head-image, url(${BgHeadImg})) center top;
`;

export const PopSpeakerWrapper = styled.div`
  display: flex;

  @media only screen and (max-width: 599px) {
    flex-direction: column;
  }
`;

export const PopSpeakerAvatarWrap = styled.div`
  flex: 0 0 auto;
  position: relative;
  width: 185px;
  height: 185px;
  margin: 0 var(--sideSpacing) 0 0;

  @media only screen and (max-width: 599px) {
    margin: 0 auto;
  }
`;

export const PopSpeakerAvatar = styled.img`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PopSpeakerDesc = styled.div`
  @media only screen and (max-width: 599px) {
    text-align: center;
  }
`;

export const PopSpeakerCategory = styled.span`
  color: var(--color-popup-general-text, #888);
`;

export const PopSpeakerTitle = styled.h4`
  font-weight: 400;
  font-size: 28px;
  margin: 20px 0 10px;
  color: var(--color-popup-title, #fff);
  &:first-child {
    margin-top: -4px;
  }
`;

export const PopSpeakerName = styled.h4`
  font-weight: 400;
  margin: -4px 0 10px;
  color: var(--color-popup-title, #fff);
  font-size: 30px;
  @media only screen and (max-width: 599px) {
    margin: 20px 0 10px;
  }
`;

export const PopSpeakerCompany = styled.p`
  font-size: 16px;
  margin: 0 0 20px;
  color: var(--color-popup-company, #fff);
`;

export const PopSpeakerBio = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-popup-general-text, #888);
  line-height: 1.46;

  a {
    text-decoration: underline;
    color: var(--color-popup-title, #fff);

    &:hover {
      text-decoration: none;
    }
  }
`;

export const PopSpeakerSocials = styled.div`
  width: 224px;

  @media only screen and (max-width: 599px) {
    position: relative;
    right: auto;
    margin: 20px auto 20px;
  }
`;

export const PopSpeakerSocialsHeader = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-popup-general-text, #888);
`;

export const PopButton = styled.a`
  cursor: pointer;
  text-align: center;
  background-color: var(--color-brand, #fff);
  padding: 15px 20px;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-popup-button-text, #000);
  text-decoration: none;
  transition: all ease 0.3s;

  &:hover {
    background-color: var(--color-brand-hover, #f0f0f0);
  }
`;

export const PopSpeakerBtn = styled(PopButton)`
  display: block;

  &:not(:first-child) {
    margin: 10px 0 0;
  }

  @media only screen and (max-width: 1200px) {
    padding: 15px 20px;
  }
`;

export const PopCalendarButton = styled(PopButton)`
  display: block;
  margin-top: 20px;
  width: 100%;
`;

export const PopSpeakerMidWrapper = styled.div`
  display: flex;
  padding: var(--sideSpacing);
  gap: var(--sideSpacing);
`;

export const PopSpeakerMidLeft = styled.div`
  flex: 1;
`;

export const PopSpeakerMidRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--sideSpacing) / 2);

  @media only screen and (max-width: 599px) {
    display: none;
  }
`;

export const PopSpeakerActivityInfo = styled.div`
  color: ${({ color }) => color};
  display: flex;
  border-left: 3px solid ${({ color }) => color};
  background: var(--color-popup-track-info, #222522);
  padding: 17px 15px;
  margin: 0 0 30px;
  flex-wrap: wrap;

  span {
    margin: 0 15px;
    padding: 0;
    white-space: nowrap;

    &:first-child {
      margin: 0 auto 0 0;
    }
  }
`;

export const LightningTalkContainer = styled.div`
  padding: 32px;
`;

export const WorkshopInfoContainer = styled.div`
  display: flex;
  margin: var(--sideSpacing);

  @media only screen and (max-width: 599px) {
    flex-direction: column;
  }
`;

export const WorkshopInfoTitle = styled.div`
  flex: 0 0 auto;
  position: relative;
  width: 185px;
  margin: 0 var(--sideSpacing) 0 0;
`;

export const WorkshopPopBio = styled(PopSpeakerBio)`
  text-align: justify;

  p:not(:first-child) {
    margin-top: 16px;
  }
`;

export const WorkshopButtonContainer = styled.div`
  position: sticky;
  bottom: 0px;
  padding: 16px var(--sideSpacing);
`;

export const MobileOnly = styled.div`
  @media only screen and (min-width: 599px) {
    display: none;
  }
`;

export const PopSpeakerContentWrap = styled.div`
  &:not(:first-child) {
    margin-top: 30px;
  }
`;
