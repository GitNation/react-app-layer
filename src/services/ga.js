export const trackGAEvent = (category, name, isAuth) => {
  // google analytics
  if (window.gtag) {
    gtag('event', `${name}; isAuth:${isAuth}`, {
      event_category: category,
    });
  }
};
