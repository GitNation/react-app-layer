import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

function PartnerListItem() {
  let { slug } = useParams();
  return <div>Now showing post {slug}</div>;
}

const Page = styled.div`
  height: 100%;
`;
const Back = styled.div`
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 20px;
  background: white;
  padding: 10px;
`;
const Container = styled.div`
  display: flex;
  height: 100%;
`;
const ContainerLeft = styled.div`
  flex: auto;
`;
const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;
const PartnerInfo = styled.div`
  padding: 20px;
`;
const Chat = styled.div`
  position: relative;
  flex: auto;
  overflow: hidden;
`;
const Description = styled.div`
  margin-top: 10px;
`;
const ChatIfrmae = styled.iframe`
  position: absolute;
  left: 0;
  top: -72px;
  width: 100%;
  height: calc(100% + 72px);
`;
const VideoIframe = styled.iframe`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;
const VideoCta = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 1;
`;
const Button = styled.a`
  display: flex;
  text-align: center;
  background-color: #fef502;
  padding: 26px 30px;
  font-size: 14px;
  font-family: GothamPro, Arial, sans-serif;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  transition: all ease 0.3s;
  transform: translateZ(0) perspective(1px);
  backface-visibility: hidden;
`;

const partners = [
  {
    name: 'Mux',
    description: 'API for video streaming',
    logo: 'https://media.graphcms.com/1mzHE2TNS5uoBxP4eTdP',
  },
  {
    name: 'Frontinty',
    description: 'The React framework for WordPress',
    logo: 'https://media.graphcms.com/cRxbGoigQaqfjzKWgsNH',
  },
];

export default function PartnerPage({ partners }) {
  let { partner } = useParams();

  const partnerObject = partners[partner];

  const { name, description, logo } = partnerObject;

  return (
    <Page>
      <Back>
        <Link to="/">Back to expo</Link>
      </Back>
      <VideoCta>
        <Button
          href="http://calendly.com/robert-haritonov/30min?back=1"
          target="_blank"
        >
          Book 1-1 slot
        </Button>
      </VideoCta>
      <Container>
        <ContainerLeft>
          <VideoContainer>
            <VideoIframe
              src="https://www.youtube.com/embed/gfbWjD4SwmU"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen=""
            ></VideoIframe>
          </VideoContainer>
        </ContainerLeft>
        <ContainerRight>
          <PartnerInfo>
            <div>
              <img src={logo} width={200} />
            </div>
            <h2>{name}</h2>
            <Description>{description}</Description>
          </PartnerInfo>
          <Chat>
            <ChatIfrmae
              src="https://titanembeds.com/embed/717374104960761916?defaultchannel=717374221466075136&fixedsidenav=false&theme=DiscordDark"
              frameborder="0"
            ></ChatIfrmae>
          </Chat>
        </ContainerRight>
      </Container>
    </Page>
  );
}
