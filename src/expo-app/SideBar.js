import React from 'react';
import styled from 'styled-components';
import { Switch, Route, NavLink, useRouteMatch } from 'react-router-dom';
import { useLocalStorage } from '../lib/useLocalStorage';

const brandColor = '#fef502';

const Container = styled.div`
  flex: auto;
  display: flex;
  flex-direction: column;
  background: black;
`;
const Tabs = styled.div`
  margin: 0;
  padding: 0;

  li {
    display: inline-block;
    border-right: 3px solid #151513;

    &:first-child {
      border-left: 3px solid black;
    }
  }

  a {
    display: block;
    border-bottom: 3px solid black;
    padding: 15px 34px;
    text-transform: uppercase;
    text-decoration: none;
    color: white;
    background: black;
    font-family: GothamPro, Arial, sans-serif;
    font-size: 12px;
    font-weight: 700;

    &.selected,
    &:hover {
      text-decoration: none;
      color: white;
      background: #151513;
      border-bottom-color: ${brandColor};
    }
  }
`;

const PartnerInfo = styled.div`
  padding: 10px 20px 20px;
  color: #565656;

  h2 {
    font-size: 14px;
    margin: 0;
    font-weight: 400;
  }
`;
const Chat = styled.div`
  position: relative;
  flex: auto;
  overflow: hidden;
  min-height: 400px;
`;
const Description = styled.div`
  margin-top: 10px;

  color: ${(props) => (props.extended ? 'white' : '#5f5f5f')};
  font-size: 14px;
  line-height: 1.5;

  h2 {
    color: #585858;
    font-size: 18px;
    margin: 0 0 15px 0;
    font-weight: 400;
  }

  a {
    color: white;

    &:hover {
      color: white;
    }
  }

  ul {
    margin-top: 10px;
  }

  li {
    margin-bottom: 5px;
    &:before {
      content: '●';
      display: inline-block;
      margin-right: 10px;
    }
  }

  p {
    margin-top: 10px;
  }
`;
const ChatIfrmae = styled.iframe`
  position: absolute;
  left: 20px;
  width: calc(100% - 40px);
  top: 0;
  height: 100%;
`;
const ImageContainer = styled.div`
  margin-bottom: ${(props) => (props.bigger ? '20px' : '0px')};

  img {
    height: ${(props) => (props.bigger ? '120px' : '80px')};
  }
`;

const DiscordLoginOverlay = styled.div`
  background: #151513;
  padding: 20px;
  display: flex;
  color: white;
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  z-index: 2;
  align-items: center;
`;

const DiscordLoginOverlayText = styled.div`
  flex: auto;
  font-size: 12px;
  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: whote;
      text-decoration: underline;
    }
  }
  @media (min-width: 1400px) {
    font-size: 14px;
  }
`;

const DiscordLoginOverlayClose = styled.button`
  font-size: 12px;
  color: #5f5f5f;
  text-transform: uppercase;
  border: none;
  appearance: none;
  background: none;
  margin-left: 10px;
`;

const DiscordOverlay = styled.div`
  background: #7289da;
  padding: 10px 20px;
  display: flex;
  color: white;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 2;
  align-items: center;
`;
const DiscordIcon = styled.div`
  width: 65px;
  height: 34px;
  background-image: url(/img/discord-icon.png);
  background-size: contain;
  background-repeat: no-repeat;
}
`;
const DiscordText = styled.div`
  flex: auto;
  padding: 0 10px 0 20px;
  line-height: 1.4;
  font-size: 12px;

  @media (min-width: 1400px) {
    font-size: 14px;
  }
`;
const DiscordLink = styled.div`
  color: ${brandColor};
  text-transform: uppercase;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  font-family: GothamPro, Arial, sans-serif;
  white-space: nowrap;

  &:hover {
    color: ${brandColor};
    text-decoration: underline;
  }
`;

export default function SideBar({ partner }) {
  const {
    name,
    description,
    logo,
    showTabNav,
    discordEmbedLink,
    chatDisabled,
    aboutLink,
    descriptionExtended,
    perks,
  } = partner;
  const { path, url } = useRouteMatch();
  const [hideDiscordInvite, setCloseDiscordInvite] = useLocalStorage(
    'expo-app-remember-hide-discord-invite',
  );
  const discordInviteLink =
    window.location.href.indexOf('live') >= 0
      ? config && config.discordFullAccessInvite
      : config && config.discordReadOnlyInvite;

  return (
    <Container>
      {config && config.showTabNav && showTabNav && (
        <Tabs as="ul">
          {!chatDisabled && (
            <li>
              <NavLink
                to={`${url}`}
                exact={!chatDisabled}
                activeClassName="selected"
              >
                Chat
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to={chatDisabled ? `${url}` : `${url}/about`}
              activeClassName="selected"
              exact={chatDisabled}
            >
              About
            </NavLink>
          </li>
          {perks && (
            <li>
              <NavLink to={`${url}/perks`} activeClassName="selected">
                Perks & Resources
              </NavLink>
            </li>
          )}
        </Tabs>
      )}
      <Switch>
        {!chatDisabled && (
          <Route exact={!chatDisabled} path={path}>
            <PartnerInfo>
              <ImageContainer>
                <img src={logo} />
              </ImageContainer>
              <Description>
                <p>{description}</p>

                {aboutLink && aboutLink.link && aboutLink.text && (
                  <p>
                    <a href={aboutLink.link} target="_blank">
                      {aboutLink.text}
                    </a>
                  </p>
                )}
              </Description>
            </PartnerInfo>
            <Chat>
              <DiscordOverlay>
                <DiscordIcon />
                <DiscordText>
                  Speak with company reps in chat below or visit our Discord
                  server.
                </DiscordText>
                <DiscordLink
                  as="a"
                  href={config && config.discordLink}
                  target="_blank"
                >
                  Open Discord
                </DiscordLink>
              </DiscordOverlay>
              {discordEmbedLink && (
                <ChatIfrmae src={discordEmbedLink} frameborder="0" />
              )}
              {!hideDiscordInvite && (
                <DiscordLoginOverlay>
                  <DiscordLoginOverlayText>
                    <a href={discordInviteLink} target="_blank">
                      Accept discord invitation to ask questions
                    </a>
                  </DiscordLoginOverlayText>
                  <DiscordLoginOverlayClose
                    onClick={() => {
                      setCloseDiscordInvite('true');
                    }}
                  >
                    Close
                  </DiscordLoginOverlayClose>
                </DiscordLoginOverlay>
              )}
            </Chat>
          </Route>
        )}
        <Route
          path={chatDisabled ? path : `${path}/about`}
          exact={chatDisabled}
        >
          <PartnerInfo>
            <ImageContainer bigger>
              <img src={logo} />
            </ImageContainer>
            <Description extended>
              {descriptionExtended ? (
                <div
                  dangerouslySetInnerHTML={{ __html: descriptionExtended }}
                />
              ) : (
                <p>{description}</p>
              )}
            </Description>
          </PartnerInfo>
        </Route>
        {perks && (
          <Route path={`${path}/perks`}>
            <PartnerInfo>
              <Description extended>
                <div dangerouslySetInnerHTML={{ __html: perks }} />
              </Description>
            </PartnerInfo>
          </Route>
        )}
      </Switch>
    </Container>
  );
}
