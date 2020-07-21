const jwt = require('jsonwebtoken');
const env = require("./../env.json")


module.exports = function (req, res, next){
    const authHeader = req.header('Authorization');
    let token;
    if(authHeader && authHeader.split(' ')[0] ===  'Bearer'){
        token = authHeader.split(' ')[1];
    }
    if(!token) return res.status(401).send({message:'Access Denied'})
    try{
        const verified = jwt.verify(token, env.TOKEN_SECRET_ACCESS);
        req.user = verified;
        return next()
    }catch(err){
        res.status(400).send({message:'Invalid Token'})
    }
    
}

