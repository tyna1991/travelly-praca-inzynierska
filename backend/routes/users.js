const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model')
let Trip = require('../models/trip.model')
const auth = require('./createTokens')
const verify = require("./verifyToken")

router.route('/').get((req, res) =>{
    User.find()
        .then(users =>res.json(users))
        .catch(err=>res.status(400).json('Error:' + err));
});

router.route('/register').post(async(req, res) =>{
    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    const userExist = await User.findOne({login: login});
    const emailExist = await User.findOne({email: email});
    if(emailExist) return res.status(400).send({message:'Adres '+email+' jest połączony z innym kontem. Wybierz inny adres email'})
    if(userExist) return res.status(400).send({message:'Login '+login+' jest już zajęty'})
    else{
        const salt=await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new User({login:login, password:hashPassword, email:email});
        newUser.save()
        .then((user) => {
            // const newTrip = new Trip({
            //     userId:user._id,   
            // });
            // newTrip.save()
            // .then((trip)=>{res.json('user dodany')})
            // .catch(err=>res.status(400).json('Error:' + err));
            res.json(user)
            })
        .catch((err)=>{err=>res.status(400).send({message: err})});
    }
});

router.route('/login').post(async(req, res) =>{
    const login = req.body.login;
    const password = req.body.password;
    const user = await User.findOne({"login": login});
    if(user){
        const validPass = await bcrypt.compare(password, user.password)
        if(!validPass) return res.status(400).send({message:'Błędny login lub hasło'})
        const accessToken = auth.createAccessToken(user)
        const refreshToken = auth.createRefreshToken(user)
        res.cookie("travid", refreshToken);
        const data = {data:{
            user:{
                login:user.login,
                trips:user.trips,
            },
            accessToken:accessToken
        }}
        res.send(data)
    }else{
        return res.status(400).send({message:'Błędny login lub hasło'})
    }
});
router.route('/get-login').get(verify, (req, res) =>{
    const id=req.user._id;
    User.findOne({"_id": id})
    .then(user=>{
        return res.send({login:user.login})
    })
    .catch((err)=>{err=>res.status(400).send({message: err})});
});


module.exports = router