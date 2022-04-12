const jwt = require("jsonwebtoken");

module.exports = authorizeUserAccess = async (req, res, next) => {
  try {
    let access = await jwt.verify(req.token, process.env.accessTokenSecret, {
      algorithms: ["HS256"],
    });
    
    console.log(access)
    if(access.scope !== req.headers.scope){
        return res.status(401).json({
            error: "Incorrect scope on access token provided",
            success: false
        })
    }
    if(access.aud !== req.originalUrl){
        return res.status(401).json({
            error: "Incorrect audience on access token provided",
            success: false
        })
    }
    

    next();
  } catch (error) {
    console.log(error, "in catch");
    res.status(401).json({
      error,
      success: false,
    });
  }
};
