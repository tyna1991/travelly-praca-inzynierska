const jwt = require('jsonwebtoken');
const env = require("./../env.json")


module.exports = {
    createAccessToken: (user) => {
        return jwt.sign({_id:user._id}, env.TOKEN_SECRET_ACCESS, {expiresIn:"7d"}) 
    },
    createRefreshToken:(user) => {
        return jwt.sign({_id:user._id}, env.TOKEN_SECRET_REFRESH, {expiresIn:"1d"}) 
    }
}

