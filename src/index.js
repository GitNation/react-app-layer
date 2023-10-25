import { initModalTakeoverWidget } from './ModalTakeoverWidget';
import { initDialogs } from './dialogs';
import { initTimeTrack } from './time-track';
import { setGlobals } from './time-provider';
import { initVideoWidget } from './video-widget';
import { initPresenceTracker } from './presence-tracker';

const eventsBus = window.eventsBus;
const content = eventsBus.getContent();
setGlobals({
  ...content.eventInfo,
  reactLayerConfig: content.reactLayerConfig,
});

const initApp = () => {
  initVideoWidget(eventsBus);
  initDialogs(eventsBus);
  initTimeTrack(eventsBus);
  initModalTakeoverWidget(eventsBus);
  initPresenceTracker(eventsBus);
};

export default initApp;
