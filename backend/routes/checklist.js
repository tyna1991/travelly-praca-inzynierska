const router = require('express').Router();
let Trip = require('../models/trip.model')
let User = require('../models/user.model')
let Countries = require('../models/country.model')
let Accomodation = require('../models/accomodation.model')
let Destination = require('../models/destination.model')
let Event = require('../models/event.model')
let CountriesInfo = require('../models/countriesInfo.model')
let Events = require('../models/event.model')
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
        List.find({tripId:reqId})
        .then(list =>{
              return res.send(list)  
        })
        .catch(err=>{return res.json('message:' + err)})
        }
});

router.route('/add').post(verify, async(req, res) =>{
    const id = req.body.id;
    const userId=req.user._id;
    let item = req.body.list;
    let reqId;
    await getTrip.findTripById(req.params.id, userId).then(data =>{reqId = data});
    item = item.map(elem=>{
        return {
            tripId:reqId,
            term:elem.term,
            checked:elem.checked,
        }
    })
   List.insertMany(item)
   .then(list=>{
       return res.send(list);
   })
   .catch(err=>{return res.json('message:' + err)})
})

router.route('/mod').post(verify, async(req, res) =>{
    const id = req.body.id;
    const userId=req.user._id;
    let reqlist = req.body.list
    let reqId;
    await getTrip.findTripById(id, userId).then(data =>{reqId = data});
    await Promise.all(reqlist.map(async(obj) => {
        await List.updateOne({_id: obj.id}, {$set: {
            checked:obj.checked,
            }})
     }))
     .then(()=>{
         List.find({tripId:reqId})
         .then(list=>{
                         return res.send(list)
                     })
         .catch(err=>{return res.status(400).send({message: err});})
     })

})

router.route('/delete').post(verify, async(req, res) =>{
    const id = req.body.id;
    const idElem = req.body.idElem;
    const userId=req.user._id;
    let reqId;
    await getTrip.findTripById(id, userId).then(data =>{reqId = data});
    await List.deleteOne({_id:idElem})

    List.find({tripId:reqId})
    .then(list=>{
             return res.send(list)
                })
    .catch(err=>{return res.status(400).send({message: err});})
    
})



module.exports = router