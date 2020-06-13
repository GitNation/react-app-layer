const eventsBus = {
  subscribers: [],
  log: [],
  subscribe: function (cb, mutePrevious) {
    this.subscribers.push(cb);

    if (mutePrevious) {
      return;
    }
    const force = new Promise((resolve) => {
      resolve();
    });
    force.then(() => this.log.forEach((ms) => cb(ms)));
  },
  sendEvent: function (type = '', payload) {
    const message = {
      page: '{{ pageKey }}',
      type,
      payload,
    };
    this.subscribers.forEach((cb) => cb(message));
    this.log.push(message);
  },
  mountEvent: function (id, name) {
    this.sendEvent('mount', {
      name: name || id,
      id,
    });
  },
  clickEvent: function (payload) {
    this.sendEvent('click', payload);
  },
};
window.eventsBus = eventsBus;
