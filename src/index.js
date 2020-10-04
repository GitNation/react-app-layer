import { initExpoApp } from './expo-app';
import { initExpoLiveWidget } from './expo-app/LiveWidget';
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
  initExpoApp(eventsBus);
  initDialogs(eventsBus);
  initTimeTrack(eventsBus);
  initExpoLiveWidget(eventsBus);
  initModalTakeoverWidget(eventsBus);
};

export default initApp;
