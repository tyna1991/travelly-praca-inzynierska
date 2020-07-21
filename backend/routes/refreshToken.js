const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model')
const auth = require('./createTokens');
const env = require("./../env.json")

router.route('/').post(async(req, res) =>{
    const token = req.cookies.travid;
    if(!token){
        res.send({ok:false, accessToken:''})
    }
    let verified;
    try{
        verified = jwt.verify(token, env.TOKEN_SECRET_REFRESH);        
    }
    catch(err){
        return res.send({ok:false, accessToken:""})
    }
    const user = await User.findOne({_id: verified._id})
    if(!user){
        return res.send({ok:false, accessToken:""})
    }

    res.cookie("travid", auth.createRefreshToken(user))  
    return res.send({ok:true, accessToken:auth.createAccessToken(user)})
        
});


module.exports = router