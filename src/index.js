import './firebase';
import { initModalTakeoverWidget } from './ModalTakeoverWidget';
import { initDialogs } from './dialogs';
import { initTimeTrack } from './time-track';
import { setGlobals } from './time-provider';

const eventsBus = window.eventsBus;
const content = eventsBus.getContent();
setGlobals({
  ...content.eventInfo,
  reactLayerConfig: content.reactLayerConfig,
});

const initApp = () => {
  initDialogs(eventsBus);
  initTimeTrack(eventsBus);
  initModalTakeoverWidget(eventsBus);
};

export default initApp;
