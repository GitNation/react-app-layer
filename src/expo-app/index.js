import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import PartnerPage from './PartnerPage';
import PartnersList from './PartnersList';
import { db } from '../firebase';
import { useObjectVal } from 'react-firebase-hooks/database';

const AppContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

function App() {
  const [partners, loading, error] = useObjectVal(db.ref('partners'));

  return (
    <AppContainer>
      <Router basename="expo" hashType="noslash">
        <Switch>
          <Route path="/booth/:partner">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <PartnerPage partners={partners} />
            )}
          </Route>
          <Route path="/">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <PartnersList partners={partners} />
            )}
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
