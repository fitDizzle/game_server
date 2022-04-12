module.exports = getToken = (headers) => {
  try {
    if (headers && headers.authorization) {
      let parted = headers.authorization.split(" ");
      if (parted.length === 2) {
        console.log("");
        return parted[1];
      } else {
        return parted[0];
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};
