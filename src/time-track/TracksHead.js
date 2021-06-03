import React from 'react';
import { generateTimeEvents } from '../time-provider';

const TimeTick = ({ time }) => (
  <div className="time-track__head-item">{time}</div>
);

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

function TracksHead({ timeTicks, calcPosition }) {
  const position = useCurrentTime(calcPosition);
  const timeline = timeTicks.map((t) => t.time);
  return (
    <>
      <div
        className="time-track__current-time-track"
        id="js-current-time-track"
        style={{ left: position + 26 }}
      >
        <div id="js-current-time"></div>
      </div>
      <div className="time-track__head" id="js-track-head">
        {timeline.map((tm, i) => (
          <TimeTick key={`${tm}-${i}`} time={tm} />
        ))}
      </div>
    </>
  );
}

export default TracksHead;
