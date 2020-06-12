import { initExpoApp } from './expo-app';
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
};

export default initApp;
