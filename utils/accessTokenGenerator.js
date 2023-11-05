const jwt = require("jsonwebtoken");
require("dotenv").config();


const accessTokenGenerator = (user_id, scope, URL) => {
  try {
    console.log("acc gen", URL)
    const payload = {
      id: user_id,
      iss: "https://scrababble-game-server.herokuapp.com",
      sub: `user|${user_id}`,
      aud: URL,
      scope
    };

    return jwt.sign(payload, process.env.accessTokenSecret, {
      algorithm: 'HS256',
      expiresIn: "30s",
    });
  } catch (error) {
    console.log(error.message)
  }

}

module.exports = accessTokenGenerator