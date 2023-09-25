import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import PartnerPage from './PartnerPage';
import PartnersList from './PartnersList';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen(() => {
  window._gauges && window._gauges.push(['track']);
});

const AppContainer = styled.div`
  margin-bottom: 20px;

  @media (min-width: 769px) {
    margin-bottom: 0;
  }
`;

function App() {
  return (
    <AppContainer>
      <Router basename="expo" hashType="noslash" history={history}>
        <Switch>
          <Route path="/booth/:partner">
            <PartnerPage partners={partners} loading={loading} />
          </Route>
          <Route path="/">
            <PartnersList partners={partners} loading={loading} />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

const mountApp = (id) => {
  const mountNode = document.getElementById(id);
  ReactDOM.render(<App />, mountNode);
};

export const initExpoApp = (bus) => {
  const onEvent = ({ type, payload }) => {
    if (type === 'mount' && payload.name === 'expo-app') {
      mountApp(payload.id);
    }
  };
  bus.subscribe(onEvent);
};
