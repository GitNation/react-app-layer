import React from 'react';

import {
  convertEventTimeToISO,
  createScheduleEvent,
  getCurrentLocalISO,
  convertEventTimeToLocal,
} from '../time-provider';

export const getEventStatus = (payload) => {
  const eventData = payload.data;
  if (!eventData) {
    return null;
  }
  const { date, time, duration = "20" } = eventData;
  const isoStart = convertEventTimeToISO(date, time);
  const durationMM = parseInt(duration, 10);
  const checkStatus = createScheduleEvent(isoStart, durationMM);
  const now = getCurrentLocalISO();
  const status = checkStatus(now);
  return status;
};

export const getMessage = (content, status) => {
  if (status === 'before') {
    try {
      const { data } = content;
      const local = convertEventTimeToLocal(data.date, data.time);
      return `This activity is not available yet. Please try again ${local.date} at ${local.time}`;
    } catch (err) {
      return 'This activity is not available yet. Please try again later';
    }
  }

  if (status === 'after') {
    return 'Sorry. This activity is over.';
  }

  if (status === 'archived') {
    return (
      <span>
        Event moved to the archive. Checkout{' '}
        <a href="http://gitnation.org" target="_blank">
          http://gitnation.org
        </a>{' '}
        for future events.
      </span>
    );
  }
};

export const getTitle = (content) => {
  try {
    return content.data.title || content.data.linkText;
  } catch (err) {
    return 'Activity';
  }
};
