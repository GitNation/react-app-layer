import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import { useLocalStorage } from './lib/useLocalStorage';
import styled from 'styled-components';

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%)',
    padding: 0,
    background: 'none',
    border: 'none',
    overflow: 'visible',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 13,
  },
};

const Container = styled.div`
  position: relative;
  width: 90vw;
  padding-bottom: 56%;

  @media (min-width: 769px) {
    width: 800px;
  }

  @media (min-width: 1400px) {
    width: 900px;
  }
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -30px;
  right: 0;
  font-size: 16px;
  color: white;
  background: none;
  border: none;
`;

function App() {
  const [hideModaltakeoverWidget, setHideModaltakeoverWidget] = useLocalStorage(
    'modal-takeover-widget-hide',
  );

  if (hideModaltakeoverWidget === 'true') {
    return null;
  }

  return (
    <ReactModal
      isOpen={!hideModaltakeoverWidget}
      contentLabel="Inline Styles Modal Example"
      style={customStyles}
      onRequestClose={() => setHideModaltakeoverWidget('true')}
    >
      <Container>
        <iframe
          src="https://www.youtube.com/embed/OElWllLQ4fA?autoplay=1&modestbranding=1&rel=0&fs=0"
          frameborder="0"
        />
      </Container>
      <CloseButton
        onClick={() => {
          setHideModaltakeoverWidget('true');
        }}
      >
        Close
      </CloseButton>
    </ReactModal>
  );
}

const mountApp = (id) => {
  const mountNode = document.getElementById(id);
  ReactDOM.render(<App />, mountNode);
};

export const initModalTakeoverWidget = (bus) => {
  const onEvent = ({ type, payload }) => {
    if (type === 'mount' && payload.name === 'modal-takeover-widget') {
      mountApp(payload.id);
    }
  };
  bus.subscribe(onEvent);
};
