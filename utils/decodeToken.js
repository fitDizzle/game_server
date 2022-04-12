let jwt = require("jsonwebtoken");

module.exports = decodeToken = (token, type) => {
    if(type){
        let decodedToken = jwt.verify(token, process.env.accessTokenSecret, {
            algorithms: ['HS256']
        })
        const { id } = decodedToken
        return id
    }
    let decodedToken = jwt.verify(token, process.env.jwtSecret, {
        algorithms: ['HS256']
    })
    const { id } = decodedToken
    return id
}