import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { db } from '../firebase';
import { useObjectVal } from 'react-firebase-hooks/database';

const LiveWidget = styled.iframe`
  padding: 10px 20px;
  background: red;
  color: white;
  font-size: 20px;
`;

function App() {
  const [isLive, loading, error] = useObjectVal(db.ref('isLive'));

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
