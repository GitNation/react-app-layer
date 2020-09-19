import styled from 'styled-components';

/**
 * In this document we used css variable:
     --color-black
     --color-white
     --color-popup-border
     --color-popup-background
     --color-speaker-info
     --color-brand
     --color-brand-hover
     --color-tag-bg
     --background-head-image
 */

export const PopSpeaker = styled.div`
    position: relative;
    border: 15px solid var(--color-popup-border, #5f5f5f);
    background: var(--color-popup-background);
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
    padding: var(--sideSpacing);
    background: var(--background-head-image) center top;
    
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

export const PopSpeakerName = styled.h4`
    font-size: 30px;
    margin: -4px 0 10px;
    color: var(--color-white);
    
    ${({ addMobileMargin }) => addMobileMargin && "@media only screen and (max-width: 599px) { margin: 20px 0 10px; }"}
`;

export const PopSpeakerCompany = styled.p`
    font-size: 16px;
    margin: 0 0 20px;
    color: var(--color-white);
`;

export const PopSpeakerBio = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: var(--color-popup-border);
    line-height: 1.46;
`;

export const PopSpeakerSocials = styled.div`
    width: 224px;
    position: absolute;
    right: var(--sideSpacing);
    top: calc(100% + var(--sideSpacing));
    
    @media only screen and (max-width: 599px) {
        position: relative;
        right: auto;
        margin: 30px auto 0;
    }
`;

export const PopSpeakerBtn = styled.a`
    display: flex;
    cursor: pointer;
    text-align: center;
    background-color: var(--color-brand);
    padding: 15px 20px;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-black);
    text-decoration: none;
    transition: all ease 0.3s;
    transform: translateZ(0) perspective(1px);
    backface-visibility: hidden;
    border: 2px solid transparent;
    
    &:hover {
        background-color: var(--color-brand-hover);
    }
    
    &:not(:first-child) {
        margin: 10px 0 0;
    }
    
    @media only screen and (max-width: 1200px) {
        padding: 15px 20px;
    }
`;

export const PopSpeakerMid = styled.div`
    padding: var(--sideSpacing) calc(254px + var(--sideSpacing)) var(--sideSpacing) var(--sideSpacing);
    
    @media only screen and (max-width: 599px) {
        padding: var(--sideSpacing);
    }
`;

export const PopSpeakerActivityInfo = styled.div`
  color: ${({ color }) => color};
  display: flex;
  border-left: 3px solid ${({ color }) => color};
  background: var(--color-speaker-info);
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
