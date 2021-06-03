export const trackGAEvent = (category, type, values, isAuth) => {
  // google analytics
  if (window.gtag) {
    gtag(
      'event',
      `${category}-${type} - ${values};${
        typeof isAuth !== 'undefined' ? ` isAuth:${isAuth}` : ''
      }`,
      {
        event_category: category,
      },
    );
  }
};
