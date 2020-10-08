export const titoFindTicket = (email, callback) => {
  try {
    fetch(
      `https://gn-functions.netlify.app/.netlify/functions/tito-find-user-code?email=${email}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        callback({ data });
      });
  } catch (error) {
    callback({ error });
  }
};
