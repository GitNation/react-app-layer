import styled from 'styled-components';
import { BgHeadImg } from './SpeakerCard.styled';

/**
 * In this document we used css variable:
 --color-popup-title
 --color-popup-company
 --color-popup-button-text
 --color-popup-border = #5f5f5f
 --color-popup-background = #131513
 --color-popup-track-info
 --color-brand
 --color-brand-hover
 --background-popup-head-image
 */

export const PopSponsor = styled.div`
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

export const PopSponsorTop = styled.div`
  position: relative;
  display: flex;
  padding: var(--sideSpacing);
  background: var(--background-popup-head-image, url(${BgHeadImg})) center top;

  min-height: 200px;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 599px) {
    flex-direction: column;
  }
`;

export const PopSponsorLogo = styled.img`
  width: 400px;
  height: auto;

  @media only screen and (max-width: 599px) {
    width: 100%;
  }
`;

export const PopSponsorTitle = styled.h4`
  font-weight: 400;
  font-size: 28px;
  margin: -4px 0 10px;
  color: var(--color-popup-title, #fff);
`;

export const PopSponsorBio = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--color-popup-general-text, #5f5f5f);
  line-height: 1.46;

  a {
    text-decoration: underline;
    color: var(--color-popup-title, #fff);

    &:hover {
      text-decoration: none;
    }
  }
`;

export const PopSponsorPerk = styled(PopSponsorBio)`
  margin-top: 20px;
  border-top: 2px solid #2e2e2c;
  padding-top: 20px;
`;

export const PopSponsorActions = styled.div`
  width: 224px;
  position: absolute;
  right: var(--sideSpacing);
  top: calc(100% + var(--sideSpacing));

  @media only screen and (max-width: 599px) {
    position: relative;
    right: auto;
    margin: 50px auto 0;
  }
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

export const PopSponsorBtn = styled(PopButton)`
  display: block;

  ${({ disabled }) =>
    disabled &&
    `
    cursor: default;
    opacity: 0.5;
    `}

  &:not(:first-child) {
    margin: 10px 0 0;
  }

  @media only screen and (max-width: 1200px) {
    padding: 15px 20px;
  }
`;

export const PopSponsorBtnDisclaimer = styled.div`
  margin-top: 10px;
  font-size: 12px;
  color: #fff;
`;

export const PopSponsorPerkBtn = styled(PopButton)`
  margin-top: 20px;

  border: 2px solid transparent;
  color: var(--color-brand, #fff);
  font-size: 14px;
  position: relative;
  display: flex;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0) perspective(1px);
  backface-visibility: hidden;
  border-radius: 5px;

  &:after {
    transition: 0.2s all ease;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -2;
    background: var(--color-brand, #fff);
    animation: AnimationName 5s linear infinite;
  }

  &:before {
    transition: 0.2s all ease;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    border-radius: 3px;
    background: #161917;
    animation: AnimationName 5s linear infinite;
  }

  &:hover {
    color: #000;
    background: #fff;

    &:after,
    &:before {
      opacity: 0;
      background: #fff;
    }
  }
`;

export const PopSponsorMid = styled.div`
  min-height: calc(
    var(--sideSpacing) + ${({ minHeight }) => minHeight}px + var(--sideSpacing)
  );
  padding: var(--sideSpacing) calc(254px + var(--sideSpacing))
    var(--sideSpacing) var(--sideSpacing);

  @media only screen and (max-width: 599px) {
    padding: var(--sideSpacing);
  }
`;
