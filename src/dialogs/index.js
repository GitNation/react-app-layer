import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const mountEventName = 'dialog-popup';

const mountApp = (id, bus) => {
  const mountNode = document.getElementById(id);
  ReactDOM.render(<App bus={bus} />, mountNode);
};

export const initDialogs = (bus) => {
  const onEvent = ({ type, payload }) => {
    if (type === 'mount' && payload.name === mountEventName) {
      mountApp(payload.id, bus);
    }
  };
  bus.subscribe(onEvent);
};
