import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="live-programm js-tabs-container">
      <div className="container">
        <div className="time-track">{children}</div>
      </div>
    </div>
  );
};

export default Container;
