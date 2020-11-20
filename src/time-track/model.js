import { DateTime } from 'luxon';

import {
  convertEventTimeToISO,
  createTimeRange,
  convertEventTimeToLocal,
  iso2sec,
} from '../time-provider';

const trackStepInMin = 5;
const pxPerMinute = 50 / trackStepInMin;

export const createTimeTicks = (startEvent, endEvent) => {
  const ticks = createTimeRange(startEvent, endEvent, trackStepInMin);

  return ticks;
};

export const calcPositionFromTime = (startEvent, k = 1) => {
  const secStart = iso2sec(startEvent);
  return (event) => {
    const { time, isoDate, z } = event;

    const local = convertEventTimeToLocal(isoDate, time, z);
    const sec = local.sec;
    const dist = ((sec - secStart) * pxPerMinute * k) / 60;

    return dist;
  };
};

export const calcWidth = (duration, k = 1) => {
  const mm = parseInt(duration, 10);
  const width = mm * pxPerMinute * k;
  return width;
};
