const jwt = require("jsonwebtoken");
const getToken = require("../utils/getToken");
const accessTokenGen = require("../utils/accessTokenGenerator")

module.exports = authenticateUser = async (req, res, next) => {
  try {
    const token = getToken(req.headers);
    const { scope } = req.headers
    console.log("Authenticate User middlware", token)
  
     let id =  await jwt.verify(token, process.env.jwtSecret, {
        algorithms: ["HS256"],
      });
      req.token = accessTokenGen(id, scope, req.originalUrl)

      next();
  } catch (error) {
    res.status(401).json({
      error,
      success: false
    });

  }

  
};
