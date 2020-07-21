const router = require('express').Router();
let Trip = require('../models/trip.model')
let User = require('../models/user.model')
let Countries = require('../models/country.model')
let Accomodation = require('../models/accomodation.model')
let Destination = require('../models/destination.model')
let Event = require('../models/event.model')
let CountriesInfo = require('../models/countriesInfo.model')
let countryOfTheWorld = require('../models/countryOfTheWorld.model')
let Routes = require('../models/route.model')
let List = require('../models/list.model')
const verify = require("./verifyToken")
const googleApi = require("./../placeIdApi");
const setRoutes = require("./../generateRoutes");
const getTrip = require("../getTripById");
var mongoose = require('mongoose');



router.route('/dashboard/:id').get(verify, async (req, res) =>{
    const userId=req.user._id;
    let reqId;
    if(req.params.id===undefined || req.params.id==0){
        await Trip.findOne({user:userId}).sort({timeStamp:-1})
        .then(data =>{
            if(data){
            reqId = data._id
            }else{
                return res.send([]);
            }
        })
        .catch(err=>{return res.status(400).json('message:' + err)})
    }else{
        reqId = req.params.id
    }

    if(reqId){
        await Promise.all([
            Trip.findOne({_id:reqId, user:userId}),
            Countries.find({idTrip:reqId}),
            CountriesInfo.find({trip:reqId}),
        ])           
        .then(async (result)=>{
            let countries = result[1];
            result[3]=[];
            await Promise.all(countries.map(async (elem)=>{
                await countryOfTheWorld.findById(elem.idOfCountry).then(elem=>{result[3].push(elem)})}));
            return result
         })
         .then(result =>{
            let trip = result[0];
            let countries = result[1];
            let countryOfTheWorld = result[3];
             return res.json({trip, countries,  countryOfTheWorld})
         })
        .catch(err=>{return res.json('message:' + err)})
        }
});

router.route('/travel-points/:id').get(verify, async (req, res) =>{
    const userId=req.user._id;
    let reqId;
    await getTrip.findTripById(req.params.id, userId).then(data =>{reqId = data});
    if(reqId){
        await Promise.all([
            Trip.findOne({_id:reqId, user:userId}),
            Countries.find({idTrip:reqId}),
            Accomodation.find({tripId:reqId}),
            Destination.find({tripId:reqId}),
        ])           
         .then(async(result) =>{
            let countries = result[1];
            let modCoutries=[];
            await Promise.all(countries.map(async(elem)=>{
                await countryOfTheWorld.findOne({_id:elem.idOfCountry})
                .then(data=>{
                    modCoutries.push({id: elem.idOfCountry, name : data.name, code: data.code})
                });
            }))
            result[1] = modCoutries;
            return result;
        })
        .then(result=>{
            let trip = result[0];
            let countries = result[1];
            let accomodations = result[2];
            let destinations = result[3];
            return res.json({trip, countries, accomodations, destinations})
         })
        .catch(err=>{return res.json('message:' + err)})
        }
});

router.route('/events/:id').get(verify, async (req, res) =>{
    const userId=req.user._id;
    let reqId;
    await getTrip.findTripById(req.params.id, userId).then(data =>{reqId = data});
    if(reqId){
        await Event.find({trip:reqId})      
         .then(events =>{
                return res.json(events)
         })
        .catch(err=>{return res.json('message:' + err)})
        }
});


router.route('/delete/:id').delete(verify, async (req, res) =>{
    // const userId=req.user._id;
    // let reqId;
    Promise.all([
         Trip.deleteOne({_id:req.params.id}),
         Countries.deleteMany({idTrip:req.params.id}),
         Accomodation.deleteMany({tripId:req.params.id}),
         Destination.deleteMany({tripId:req.params.id}),
         Event.deleteMany({trip:req.params.id}),
         Routes.deleteMany({tripId:req.params.id}),
         List.deleteMany({tripId:req.params.id}),
         CountriesInfo.deleteMany({trip:req.params.id})
    ])
    .then(res.status(200).send({}))
    .catch(err=>{return res.json('message:' + err)})
    
});



// router.route('/countries-info/:id').get(verify, (req, res) =>{
//     const userId=req.user._id;
//         User.findById(userId).populate('trips')
//         .then(user=>{
//             user.trips.findById(req.param.id)
//             .then(trip =>{res.json(trip.countriesInfo)})
//             .catch(err=>res.status(400).json('Error:' + err))
//         })
//         .catch(err=>res.status(400).json('Error:' + err))

// });

router.route('/all').get(verify, (req, res) =>{
    const userId=req.user._id;
    Trip.find({user:userId})
        .then(data=>{
            const dataMapped = data.map(elem=>{
                return {id : elem._id, tripName: elem.name, timeStamp:elem.timeStamp}
            })
            return dataMapped;
        })
        .then(data =>{res.json(data)})
        .catch(err=>res.status(400).json('Error:' + err));
});

router.route('/edit/:id/:filter').get(verify, async(req, res) =>{
    const userId=req.user._id;
    let reqId;
    await getTrip.findTripById(req.params.id, userId).then(data =>{reqId = data});
    var arr = (req.params.filter).split(",");
    Promise.all([
        (arr.includes("trip")) ? Trip.findOne({_id:reqId}).catch(err=>res.status(400).send({message: err})) : {},
        Countries.find({idTrip:reqId}).catch(err=>res.status(400).send({message: err})),
        (arr.includes("destinations")) ? Destination.find({tripId:reqId}).catch(err=>res.status(400).send({message: err})) : [],
        (arr.includes("accomodations")) ? Accomodation.find({tripId:reqId}).catch(err=>res.status(400).send({message: err})) : [],
    ])
    .then(async result=>{
        let countries = result[1];
        let modcountries = [];
        await Promise.all(countries.map(async (elem)=>{
            await countryOfTheWorld.findById(elem.idOfCountry).then(data=>{modcountries.push({...elem._doc, name:data.name})})}));
        result[1] = modcountries;    
        return result
    })
    .then(result=>{
        let trip = result[0];
        let countries = result[1];
        let destinations = result[2];
        let accomodations = result[3];
        return res.json({trip, countries, destinations, accomodations})
    })
    .catch(err=>res.status(400).send({message: err}));
});

router.route('/events').post(verify, async(req, res) =>{
    const userId=req.user._id;
    let id = req.body.id;
    let destinations = req.body.destinations;
    let events = [];
    destinations = destinations.map(destination=>{delete destination.id; return destination});
    
    destinations.map(destination=>{
        const idDestination = mongoose.Types.ObjectId();
       destination._id = idDestination
        destination.tripId = id;
        events.push({
            trip:id,
            destination: idDestination,
            color:'#ff6600',
            date:'',
            since:'',
            to:''
        })
    })
    

    Promise.all([
        Destination.insertMany(destinations),
        Event.insertMany(events)
    ])           
    .then(result=>{
        let destinations = result[0];
        let events = result[1];
        return res.json({destinations, events})
     })
    .catch(err=>{return res.status(400).send({message: err});})

})
        
router.route('/events/mod').post(verify, async(req, res) =>{
    const id = req.body.id;
    let events = req.body.events
    
    await Promise.all(events.map(async(obj) => {
        await Event.updateOne({_id: obj._id}, {$set: {
            color: obj.color,
            date:obj.date,
            since: obj.since,
            to:obj.to
        }})
    }))
     .then(()=>{
         const routes = setRoutes.generateRoutes(events);
         Promise.all(routes.map(async (route)=>{

             await Routes.deleteOne({_id:route._id})
         }))
         .then(()=>{
             Routes.insertMany(routes);
             Event.find({trip:id})
             .then(events=>{
                             return res.send({events})
                         })
             .catch(err=>{return res.status(400).send({message: err});})

         })
     })

})


router.route('/trip/set').post(verify, async(req, res) =>{
    const trip = req.body.trip;
    let countries = req.body.countries
    let accomodations = req.body.accomodations
    let destinations = req.body.destinations
    let events = [];
    let eventsNewEdition = [];
    const edition = req.body.edition
    const userId=req.user._id
    const id = trip.id!=='' ? trip.id : mongoose.Types.ObjectId();
    let duplicateName=false;

    //check for duplicate trip
    await Trip.find({user: userId, name:trip.tripName})
    .then(elem => {
        if(elem.length && !edition){
            duplicateName = true; 
        }  
    })
    .catch(err =>{return res.status(400).send({message: err})})
    if(duplicateName){
        return res.status(400).send({message: 'Nazwa podróży "'+ trip.tripName + '" jest już zajęta'})
    }

    let promiseArrDestinations=[]
    let promiseArrAccomodations=[]
    
    const arr=[{name:accomodations, model:Accomodation}, {name:destinations, model:Destination}];
    await arr.forEach(async (place) =>{
        await place.name.forEach(async (element) => {
            element.tripId = id;
            const idPlace = !edition ? mongoose.Types.ObjectId() : (Number.isInteger(element.id) ? mongoose.Types.ObjectId() : element.id);
            if (edition){
                if(!Number.isInteger(element.id)){
                    let editedPlaceById;
                    await place.model.findOne({_id:element.id})
                    .then(data=>{editedPlaceById = data})
                    if (editedPlaceById.address !== element.address){
                        //remove event
                        element.place_id='';
                        if(place.name==destinations){
                            await Event.deleteOne({destination:editedPlaceById._id});
                            const newEvent = {
                                trip:id,
                                destination: idPlace,
                                color:'#ff6600',
                                date:'',
                                since:'',
                                to:''
                            }
                            eventsNewEdition.push(newEvent); 
                        }
                    }
                }
            }
            if (place.name==destinations){
                element._id = idPlace;
                const newEvent = {
                    trip:id,
                    destination: idPlace,
                    color:'#ff6600',
                    date:'',
                    since:'',
                    to:''
                }
                !edition && events.push(newEvent);
                (edition && Number.isInteger(element.id)) && eventsNewEdition.push(newEvent);
            }
            if(!Array.isArray(element.openingHours)){
                let tempArray=[];
                tempArray.push(element.openingHours)
                element.openingHours=tempArray;
            }
            if(element.place_id==='' && element.address!==''){
                place.name==destinations && promiseArrDestinations.push(googleApi.getObjectFromApi(element.address, element._id));
                place.name==accomodations && promiseArrAccomodations.push(googleApi.getObjectFromApi(element.address, element._id));
            }
            });
        })
         countries.map(country =>{
            country.idTrip = id;
            country.idOfCountry = country.id;
        })
            
        countries = countries.map(country=>{delete country.id; return country});

           
    //update
    if(edition){
        let currentCountries;
        let currentDestinations;
        let currentAccomodations;

        await Countries.find({idTrip:id})
        .then(data=>{
            data.forEach(async elem=>{
                const index = countries.findIndex(country=>{return country.idOfCountry==elem.idOfCountry});
                if(index<0){
                    await CountriesInfo.deleteOne({idCountry:elem.idOfCountry, trip:elem.idTrip})
                } 
            })
        })
        await Countries.deleteMany({idTrip:id});
        await Countries.insertMany(countries);
        await Countries.find({idTrip:id})
        .then(data=>{
            currentCountries = data
            return data
        })

        await Promise.all(promiseArrDestinations)
       .then(res=>{
        res.forEach(elem=>{
            const index = destinations.findIndex((element)=>{return element.id === elem.id})
            if(elem.response.results.length){
                destinations[index].place_id = elem.response.results[0].place_id 
            }
        })
        })
       .catch(err=>{return res.status(400).send({message:err})})


       await Destination.find({tripId:id})
        .then(data=>{
            data.forEach(async elem=>{
                const index = destinations.findIndex(dest=>{return dest._id==elem._id});
                if(index<0){
                    await Event.deleteOne({destination:elem._id})
                } 
            })
        })
        await Destination.deleteMany({tripId:id});
        await Destination.insertMany(destinations);
        await Destination.find({tripId:id})
        .then(data=>{
            currentDestinations = data
            return data
        })

        // currentDestinations.forEach(elem=>{
        //     Event.findOne({destination:elem._id})
        //     .then(data=>{
        //         if(!data){

        //         }
        //     })
        // })

        await Promise.all(promiseArrAccomodations)
       .then(res=>{
           res.forEach(elem=>{
            const index = accomodations.findIndex((element)=>{return element.id === elem.id})
            accomodations[index].place_id = elem.response.results[0].place_id 
           })
        })
       .catch(err=>{return res.status(400).send({message: err})})
        await Accomodation.deleteMany({tripId:id});
        await Accomodation.insertMany(accomodations);
        
        Accomodation.find({tripId:id})
        .then(data=>{
            currentAccomodations = data
            return data
        })


        await Event.insertMany(eventsNewEdition)
        
        await Routes.deleteMany({tripId:id})
        Event.find({trip:id})
        .then(data=>{
            const routes = setRoutes.generateRoutes(data);
            Promise.all(routes.map(async (route)=>{
                await Routes.deleteOne({_id:route._id})
            }))
            .then(()=>{
                Routes.insertMany(routes);
            })
        })


        await Trip.deleteOne({user:userId, _id:id});
        const newTrip = new Trip({
            _id:id,
            user:userId,
            name : trip.tripName,
            dateSince : trip.dateSince,
            dateTo : trip.dateTo,
            timeStamp : +new Date()
        })
        newTrip.save()
        .then(trip=>{
            return res.json({trip, countries:currentCountries, accomodations:currentAccomodations, destinations:currentDestinations})
        })
        .catch(err=>{return res.status(400).send({message: err})})

    }else{

        const newTrip = new Trip({
            _id:id,
            user:userId,
            name : trip.tripName,
            dateSince : trip.dateSince,
            dateTo : trip.dateTo,
            timeStamp : +new Date()
        })
        
        Promise.all([
            newTrip.save(),
            Countries.insertMany(countries),
            Accomodation.insertMany(accomodations),
            Destination.insertMany(destinations),
            Event.insertMany(events)
        ])           
        .then(result=>{
            let trip = result[0];
            let countries = result[1];
            let accomodations = result[2];
            let destinations = result[2];
            let events = result[3];
            return res.json({trip, countries, accomodations, destinations, events})
         })
        .catch(()=>{return res.status(400).send({message: err})})};

        // newTrip.save()
        //     .then((trip) => {
        //         Countries.insertMany(countries)
        //         .then((countries)=>{
        //             Accomodation.insertMany(accomodations)
        //             .then((accomodations)=>{
        //                 Destination.insertMany(destinations)
        //                 .then((destinations)=>{res.json({trip, countries, accomodations, destinations})})
        //                 .catch(err=>{ res.status(400).send({message: err})});
        //             })
        //             .catch(err=> res.status(400).send({message: err})});
        //         })
        //         .catch(err=>{ res.status(400).send({message: err})});
        //     })
        //     .catch(err=>{ res.status(400).send({message: err})});
        
    
})
    

module.exports = router