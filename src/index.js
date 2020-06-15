import { initExpoApp } from './expo-app';
import { initExpoLiveWidget } from './expo-app/LiveWidget';
import { initDialogs } from './dialogs';
import { initTimeTrack } from './time-track';
import { setGlobals } from './time-provider';

const eventsBus = window.eventsBus;
const content = eventsBus.getContent();
setGlobals({ ...content.eventInfo });

const initApp = () => {
  initExpoApp(eventsBus);
  initDialogs(eventsBus);
  initTimeTrack(eventsBus);
  initExpoLiveWidget(eventsBus);
};

export default initApp;
