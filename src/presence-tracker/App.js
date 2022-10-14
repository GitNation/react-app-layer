import React, { useEffect } from 'react';

import { getCookie } from '../services/getCookie';

const INTERVAL = 5 * 60 * 1000;

export default function App({ bus }) {
  useEffect(() => {
    const {
      eventInfo: { emsEventId },
    } = bus.getContent();
    const email = getCookie('watchMail');

    if (emsEventId && email) {
      const interval = setInterval(() => {
        window.navigator.sendBeacon(
          'https://portal.gitnation.org/api/live/track',
          JSON.stringify({
            eventId: emsEventId,
            email,
          }),
        );
      }, INTERVAL);

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  return null;
}
