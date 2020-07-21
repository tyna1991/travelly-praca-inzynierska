const router = require('express').Router();
let Trip = require('../models/trip.model')
let User = require('../models/user.model')
let Countries = require('../models/country.model')
let Accomodation = require('../models/accomodation.model')
let Destination = require('../models/destination.model')
let Event = require('../models/event.model')
let CountriesInfo = require('../models/countriesInfo.model')
let Routes = require('../models/route.model')
let countryOfTheWorld = require('../models/countryOfTheWorld.model')
let List = require('../models/list.model')
const verify = require("./verifyToken")
const getTrip = require("../getTripById");
var mongoose = require('mongoose');


router.route('/:id').get(verify, async (req, res) =>{
    const userId=req.user._id;
    let reqId;
    await getTrip.findTripById(req.params.id, userId).then(data =>{reqId = data});
    if(reqId){
        Promise.all([
            Routes.find({tripId:reqId}),
            Trip.findOne({_id:reqId}),
            Destination.find({tripId:reqId}),



            
            Event.find({trip:reqId})
        ])           
        .then(result=>{
            let routes = result[0];
            let trip = result[1];
            let destinations = result[2];
            let events = result[3];
            return res.json({trip, routes, destinations, events})
         })
        .catch(err=>{return res.status(400).json('message:' + err);})
    };

})




module.exports = router