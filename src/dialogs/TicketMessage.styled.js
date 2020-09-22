import styled from 'styled-components';
import { PopButton } from './styled';

export const PopTicket = styled.div`
  background: var(--color-popup-background, #131513);
  border: 15px solid var(--color-brand, #5f5f5f);
  display: inline-block;
  margin: 0;
  max-width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 44px;
  position: relative;
  text-align: left;    
  width: 1030px;
  padding: 80px 0;
  z-index: 100;
  
  @media only screen and (max-width: 1023px) {
    padding: 50px 0;
  }
  
  @media only screen and (max-width: 767px) {
    padding: 0 40px;
  }
`;

export const PopTicketTwoCol = styled.div`
  display: flex;
  
  @media only screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

export const PopTicketColLeft = styled.div`
  flex: 1 0;
  display: flex;
  flex-direction: column;
  padding: 40px 64px;
  justify-content: center;
  min-height: 330px;
  
  @media only screen and (max-width: 1023px) {
    padding: 40px 40px;
  }
  
  @media only screen and (max-width: 767px) {
    min-height: 0;
    padding: 40px 0;
  }
`;

export const PopTicketTitle = styled.p`
  font-size: 24px;
  line-height: 1.28;
  text-align: center;
  margin-bottom: 28px;
`;

export const PopTicketDesc = styled.p`
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 28px;
  
  a {
    color: var(--color-brand);
  }
`;

export const PopTicketButtonWithBorder = styled(PopButton)`
  max-width: 224px;
  width: 100%;
  margin: auto auto 0;
  height: 50px;
  border: 2px solid transparent;
  color: var(--color-brand, #000);
  font-size: 14px;
  
  &:hover {
    background-color: var(--color-brand-hover, #fff);
    color: #000;
    
    &:before {
      opacity: 0;
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -2;
    background: linear-gradient(145deg, var(--color-brand), var(--color-brand-hover));
  }
  
  &:before {
    transition: 0.2s;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    background: var(--color-popup-ticket-button-before, #161917);
  }
`;

export const PopTicketColRight = styled.div`
    flex: 1 0;
    border-left: 1px solid var(--color-popup-ticket-border-column, #2c302d);
    display: flex;
    flex-direction: column;
    padding: 40px 64px;
    justify-content: center;
    min-height: 330px;
  
  @media only screen and (max-width: 1023px) {
    padding: 40px 40px;
  }
  
  @media only screen and (max-width: 767px) {
    border: none;
    border-top: 1px solid var(--color-popup-ticket-border-column, #2c302d);
    min-height: 0;
    padding: 40px 0;
  }
`;

export const PopTicketForm = styled.form`
  margin: auto 0 0;
  padding: 0;
  
  @media only screen and (max-width: 1023px) {
    border: none;
  }
`;

export const PopTicketField = styled.div`
  position: relative;
  width: 100%;
`;

export const PopTicketInput = styled.input`
  font-family: GothamPro, Arial, sans-serif;
  font-weight: 400;
  width: 100%;
  display: block;
  color: var(--color-popup-ticket-input-text, #fff);
  background-color: var(--color-popup-ticket-input-bg, #0e100f);
  transition: border-color .3s ease;
  font-size: 16px;
  padding: 16px 80px 16px 25px;
  
  &::placeholder {
    color: var(--color-popup-ticket-input-text, #fff);
  }
`;

export const PopTicketSubmitButton = styled.button`
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    padding: 0 20px;
    align-items: center;
    background-color: transparent;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-brand, #fff);
    background: var(--color-popup-ticket-button-form-bg, #000);
`;

export const PopTicketArrowSvg = styled.svg`
    width: 1em;
    height: 1em;
    transition: 0.3s;
    margin-left: 13px;
    fill: var(--color-brand, #fff);
    font-size: 20px;
    
    ${PopTicketSubmitButton}:hover & {
      transform: translateX(5px);
    }
`;
