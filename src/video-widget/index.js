import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { db } from '../firebase';
import { useObjectVal } from 'react-firebase-hooks/database';

const mountEventName = 'video-widget-mount';

const Container = styled.div``;

const List = styled.ul`
  overflow: scroll;
  white-space: nowrap;
  padding-bottom: 20px;
`;
const Item = styled.li`
  display: inline-block;
  vertical-align: top;
  margin-right: 15px;
  width: 380px;

  &:last-child {
    margin-right: 0;
  }

  @media (max-width: 767px) {
    width: 300px;
  }
`;
const ItemLink = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
const Image = styled.div`
  width: 100%;
  margin-bottom: 15px;

  img {
    display: block;
    width: 100%;
  }
`;
const Title = styled.div`
  white-space: normal;
  line-height: 1.5;
  font-size: 16px;
`;

function App({ bus }) {
  const [videos, loading, error] = useObjectVal(db.ref('videos'));
  const content = bus.getContent();
  const { isAuth } = content;

  const handleClick = (e) => {
    e.preventDefault();

    const payload = {
      data: {},
      isAuth,
      name: 'video-widget',
      link: 'https://video.gitnation.org/orders/customer_info?o=44150',
    };

    bus.clickEvent(payload);

    return false;
  };

  return (
    <Container>
      {videos && (
        <List>
          {Object.keys(videos).map((video, i) => {
            const { image, title } = videos[video];

            return (
              <Item key={i}>
                <ItemLink href="#" onClick={handleClick}>
                  <Image>
                    <img src={image} alt={title} />
                  </Image>
                  <Title>{title}</Title>
                </ItemLink>
              </Item>
            );
          })}
        </List>
      )}
    </Container>
  );
}

const mountApp = (id, bus) => {
  const mountNode = document.getElementById(id);
  ReactDOM.render(<App bus={bus} />, mountNode);
};

export const initVideoWidget = (bus) => {
  const onEvent = ({ type, payload }) => {
    if (type === 'mount' && payload.name === mountEventName) {
      mountApp(payload.id, bus);
    }
  };
  bus.subscribe(onEvent);
};
