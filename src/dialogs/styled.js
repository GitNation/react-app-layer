import styled from 'styled-components';

/**
 * In this document we used css variable:
    --color-brand
    --color-brand-hover
    --color-popup-button-text
 */

export const PopButton = styled.a`
  display: flex;
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
  transform: translateZ(0) perspective(1px);
  backface-visibility: hidden;
  border: 2px solid transparent;
  
  &:hover {
      background-color: var(--color-brand-hover, #f0f0f0);
  }
`;
