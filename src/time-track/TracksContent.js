import React from 'react';

import TracksHead from './TracksHead';
import { generateTimeEvents } from '../time-provider';

const autoScrollPosition = window.innerWidth * 0.2;

/* TODO: move to separate custom hooks */
const useCurrentTime = (calcPosition) => {
  const [position, setPosition] = React.useState(null);

  const updateTime = () => {
    const date = new Date();
    const pos = calcPosition({ isoDate: date.toISOString() });
    setPosition(pos);
  };

  React.useEffect(() => {
    generateTimeEvents({ cb: updateTime });
  }, []);

  return position;
};

function TracksContent({ children, timeTicks, trackWidth, calcPosition }) {
  const trackEl = React.useRef(null);
  const position = useCurrentTime(calcPosition);

  React.useEffect(() => {
    if (trackEl.current && position > 0 && position < trackWidth) {
      trackEl.current.scroll(position - autoScrollPosition, 0);
    }
  }, [trackEl.current]);

  return (
    <div className="time-track__content" ref={trackEl}>
      <div className="time-track__content-inner">
        <TracksHead
          timeTicks={timeTicks}
          style={{ width: trackWidth }}
          trackWidth={trackWidth}
          calcPosition={calcPosition}
        />
        <div
          className="time-track__timeline"
          id="js-timeline"
          style={{ width: trackWidth }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default TracksContent;
