import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import PartnerPage from './PartnerPage';
import PartnersList from './PartnersList';
import { db } from '../firebase';
import { useObjectVal } from 'react-firebase-hooks/database';

const AppContainer = styled.div`
  margin-bottom: 20px;

  @media (min-width: 769px) {
    margin-bottom: 0;
  }
`;

function App() {
  const [partners, loading, error] = useObjectVal(db.ref('partners'));

  return (
    <AppContainer>
      <Router basename="expo" hashType="noslash">
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
