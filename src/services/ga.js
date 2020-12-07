export const trackGAEvent = (category, values, isAuth) => {
  // google analytics
  if (window.gtag) {
    gtag('event', `${category} - ${values} isAuth:${isAuth}`, {
      event_category: category,
    });
  }
};
