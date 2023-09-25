import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export const LiveWidget = styled.div`
  padding: 5px 10px;
  background: red;
  color: white;
  font-size: 15px;
  margin-left: 10px;
  font-weight: 700;
  text-transform: uppercase;
`;

function App() {
  return <div>{isLive ? <LiveWidget>Live</LiveWidget> : null}</div>;
}

const mountApp = (id) => {
  const mountNode = document.getElementById(id);
  ReactDOM.render(<App />, mountNode);
};

export const initExpoLiveWidget = (bus) => {
  const onEvent = ({ type, payload }) => {
    if (type === 'mount' && payload.name === 'expo-live-widget') {
      mountApp(payload.id);
    }
  };
  bus.subscribe(onEvent);
};
