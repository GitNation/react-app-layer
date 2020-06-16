import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LiveWidget } from './LiveWidget';

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 10px;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px;
  }

  @media (min-width: 1400px) {
    padding: 100px 60px;
  }
`;

const itemMargin = '40px';

const CtaButton = styled.div`
  margin: 0 -${itemMargin};
  padding: 15px 0;
  text-align: center;
  text-transform: uppercase;
  color: black;
  background: #fef502;
`;

const Item = styled(Link)`
  display: block;
  font-size: 16px;
  border: 4px solid #131311;
  padding: 0 ${itemMargin};
  margin-bottom: 10px;
  text-decoration: none;
  text-align: center;
  position: relative;

  @media (min-width: 768px) {
    font-size: 18px;
    margin-bottom: 20px;
    width: 40%;
    margin-left: 15px;
    margin-right: 15px;
  }

  @media (min-width: 1400px) {
    width: 25%;
  }

  &:hover {
    text-decoration: none;
  }

  &:hover ${CtaButton} {
    background: white;
  }
`;

const ImgWrapper = styled.div`
  height: 130px;
  display: flex;
  padding: 0;

  @media (min-width: 768px) {
    height: 180px;
  }

  img {
    max-width: 100%;
    height: auto;
    max-height: 80px;
    margin: auto;

    @media (min-width: 768px) {
      max-height: 100px;
    }
  }
`;

const Description = styled.div`
  p {
    padding: 0 0 30px;
    line-height: 1.4;
    min-height: 80px;
    color: white;
  }

  h2 {
    color: #585858;
    font-size: 18px;
    margin: 0 0 15px 0;
    font-weight: 400;
  }
`;

const LiveWidgetContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default function PartnersList({ partners, loading }) {
  return (
    <Container>
      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.keys(partners).map((partner, i) => {
          const { name, description, logo, isLive } = partners[partner];

          return (
            <Item to={`/booth/${partner}`} key={i}>
              {isLive ? (
                <LiveWidgetContainer>
                  <LiveWidget>Live</LiveWidget>
                </LiveWidgetContainer>
              ) : null}
              <ImgWrapper>
                <img src={logo} />
              </ImgWrapper>
              <Description>
                <h2>{name}</h2>
                <p>{description}</p>
              </Description>
              <CtaButton>Visit</CtaButton>
            </Item>
          );
        })
      )}
    </Container>
  );
}
