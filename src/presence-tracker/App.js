import React, { useEffect } from 'react';

import { getCookie } from '../services/getCookie';
import { iso2sec } from '../time-provider';

const INTERVAL = 5 * 60 * 1000;

function isEventGoing(tracks) {
  if (tracks) {
    const currentTime = iso2sec(new Date().toISOString());

    for (const track of tracks) {
      if (track.list) {
        for (const event of track.list) {
          if (event.isoDate && event.duration) {
            const startTime = iso2sec(event.isoDate);
            const finishTime = startTime + event.duration * 60;
  
            if (currentTime > startTime && currentTime < finishTime) {
              return true;
            }
          }
        }  
      } 
    }
  }

  return false;
}

export default function App({ bus }) {
  useEffect(() => {
    const {
      eventInfo: { emsEventId },
      schedule = [],
      customTracks = [],
    } = bus.getContent();
    const email = getCookie('watchMail');

    if (emsEventId && email) {
      const interval = setInterval(() => {
        if (isEventGoing([...schedule, ...customTracks])) {
          window.navigator.sendBeacon(
            'https://portal.gitnation.org/api/live/track',
            JSON.stringify({
              eventId: emsEventId,
              email,
            }),
          );
        }
      }, INTERVAL);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return null;
}
