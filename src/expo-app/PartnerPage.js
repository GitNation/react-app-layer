import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import { LiveWidget } from './LiveWidget';

const brandColor = '#fef502';

const desktopHeight = '896px';
const tabletHeight = '600px';
const Page = styled.div`
  position: relative;
  overflow: hidden;
  @media (min-width: 769px) {
    min-height: ${tabletHeight};
  }
  @media (min-width: 1400px) {
    min-height: ${desktopHeight};
  }
`;
const LoadingContainer = styled.div`
  text-align: center;
  margin-top: 60px;
`;
const Button = styled(Link)`
  display: inline-block;
  padding: 10px 5px;
  font-size: 12px;
  text-decoration: none;
  color: white;
  margin: 10px;
  border: 3px solid #131311;
  font-weight: 700;
  min-width: 120px;
  font-family: GothamPro, Arial, sans-serif;
  text-align: center;
  text-transform: uppercase;
  transition: all ease 0.3s;

  @media (min-width: 1400px) {
    min-width: 180px;
    padding: 15px 10px;
    min-width: 100px;
    font-size: 14px;
  }

  &:hover {
    border-color: ${brandColor};
    text-decoration: none;
    color: white;
  }
`;
const TopLinksContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const Back = styled(Button)`
  margin-right: 40px;
`;
const StreamingNote = styled.div`
  align-self: center;
  margin-right: 10px;
  font-size: 12px;

  @media (min-width: 1400px) {
    font-size: 14px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    min-height: ${tabletHeight};
    flex-direction: row;
  }

  @media (min-width: 1400px) {
    min-height: ${desktopHeight};
  }
`;
const ContainerLeft = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: calc(56% + 120px);

  @media (min-width: 769px) {
    padding-bottom: 0;
    width: auto;
    flex: auto;
  }
`;
const VideoContainer = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 60px;
  height: calc(100% - 120px);

  @media (min-width: 769px) {
    position: relative;
    top: auto;
    left: auto;
    margin: 72px 0;
    height: calc(100% - 144px);
  }
`;
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 769px) {
    width: 40%;
  }

  @media (min-width: 1400px) {
    width: 30%;
  }
`;

const VideoIframe = styled.iframe`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
const CtaButtons = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
`;
const CtaButton = styled(Button)`
  background: ${brandColor};
  border-color: ${brandColor};
  color: black;

  &:hover {
    color: black;
    background: white;
    border-color: white;
  }
`;
const CtaButtonSecondary = styled(Button)`
  border-color: ${brandColor};
  &:hover {
    background: ${brandColor};
    color: black;
  }
`;

export default function PartnerPage({ partners = {}, loading }) {
  let { partner } = useParams();

  const partnerObject = partners[partner] || {};

  const { ctaButtons, embedLink, isLive } = partnerObject;

  return (
    <Page>
      {loading ? (
        <LoadingContainer>Loading...</LoadingContainer>
      ) : (
        <>
          <Container>
            <ContainerLeft>
              <TopLinksContainer>
                <Back to="/">Back to expo</Back>
                <StreamingNote>
                  {isLive ? (
                    <LiveWidget>Live</LiveWidget>
                  ) : (
                    'Consult the event schedule to see when the live stream starts. '
                  )}
                </StreamingNote>
              </TopLinksContainer>

              {ctaButtons &&
                ctaButtons.primary &&
                ctaButtons.primary.link &&
                ctaButtons.primary.text && (
                  <CtaButtons>
                    <CtaButton
                      as="a"
                      href={ctaButtons.primary.link}
                      target="_blank"
                    >
                      {ctaButtons.primary.text}
                    </CtaButton>
                    {ctaButtons.secondary &&
                      ctaButtons.secondary.link &&
                      ctaButtons.secondary.text && (
                        <CtaButtonSecondary
                          as="a"
                          href={ctaButtons.secondary.link}
                          target="_blank"
                        >
                          {ctaButtons.secondary.text}
                        </CtaButtonSecondary>
                      )}
                  </CtaButtons>
                )}
              <VideoContainer>
                {embedLink && (
                  <VideoIframe
                    src={embedLink}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen=""
                  />
                )}
              </VideoContainer>
            </ContainerLeft>
            <ContainerRight>
              <SideBar partner={partnerObject} />
            </ContainerRight>
          </Container>
        </>
      )}
    </Page>
  );
}
