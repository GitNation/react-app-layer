import React from 'react';
import cn from 'classnames';

const Aside = ({ schedule, customTracks }) => {
  const allElements = [...schedule, ...customTracks];

  return (
    <div className="time-track__aside">
      {allElements.map((tr, ind) => (
        <div className="time-track__track" key={`${tr.title}-${ind}`}>
          <div className="time-track__track-title">{tr.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Aside;
