const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    tripId: {
        type:Schema.Types.ObjectId,
        ref:'Trip',
        required: true,
    },
    idCountry:{
        type:Schema.Types.ObjectId,
        ref:'Country',
        required: true,
    }, 
    name: {
        type:String,
        required: false,
    },
    address: {
        type:String,
        required: false,
    },
    openingHours: {
        type:Array,
        required: false,
    },
    nrOfReservation: {
        type:String,
        required: false,
    },
    timeOfVisit: {
        type:String,
        required: false,
    },
    mainInformations: {
        type:String,
        required: false,
    },
    costs: {
        type:String,
        required: false,
    },
    place_id: {
        type:String,
        required: false,
    },
    // events: {
    //     type:Schema.Types.ObjectId,
    //     ref:'Event',
    //     required: false,
    // },
})
const Destination = mongoose.model('Destination', destinationSchema)
module.exports = Destination;