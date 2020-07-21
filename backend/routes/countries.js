const router = require('express').Router();
let Countries = require('../models/countryOfTheWorld.model')
let countriesInfo = require('../models/countriesInfo.model')
const verify = require("./verifyToken")
let Trip = require('../models/trip.model')
//get one



router.route('/').get((req, res) =>{
    Countries.find({}, {code:1, name:1, _id:1})
    .then(data => {
        res.json(data)
    })
    .catch(err=>res.status(400).json('message:' + err))
});


router.route('/info/:id').get(verify, (req, res) =>{
    const userId=req.user._id;
    countriesInfo.find({trip: req.params.id})
    .then(info => {
        res.json(info)
    })
    .catch(err=>res.status(400).json('message:' + err))
});

router.route('/info').post(verify, async(req, res) =>{
    const userId=req.user._id;
    const tripId = req.body.tripId;
    let idCountry = req.body.idCountry;
    let info = req.body.info;
    const isTrip = await Trip.findOne({user:userId, _id:tripId});
    if(!isTrip){
        return res.status(400).send({message:"wystąpił bład"})
    }
    const isInfo = await countriesInfo.findOne({trip:tripId, idCountry:idCountry});
    if(isInfo){
        await countriesInfo.findOneAndUpdate({trip:tripId, idCountry:idCountry}, {text : info},  {new: true, useFindAndModify: false})
        .then(()=>{return countriesInfo.find({trip:tripId})})
        .then(elem=>{return res.json(elem)})
       .catch(err=>{return res.status(400).json('message: ' + err)})
    }
    if (!isInfo){
    const newInfo = new countriesInfo({
    trip:tripId,
    idCountry:idCountry,
    text: info
    })
    newInfo.save()
    .then(()=>{return countriesInfo.find({trip:tripId})})
    .then(elem=>{return res.json(elem)})
    .catch(err=>{return res.status(400).json('message: ' + err)})
}
});

module.exports = router