const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const accomodationSchema = new Schema({
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
    dateSinceAccomodation: {
        type:String,
        required: false,
    },
    dateToAccomodation: {
        type:String,
        required: false,
    },
    address: {
        type:String,
        required: false,
    },
    telephone: {
        type:String,
        required: false,
    },
    nrOfReservation: {
        type:String,
        required: false,
    },
    timeOfCheckIn: {
        type:String,
        required: false,
    },
    timeOfCheckOut: {
        type:String,
        required: false,
    },
    amenities: {
        type:String,
        required: false,
    },
    notes: {
        type:String,
        required: false,
    },
    city: {
        type:String,
        required: false,
    },
    place_id: {
        type:String,
        required: false,
    },
    openingHours: {
        type:Array,
        required: false,
    }
})
const Accomodation = mongoose.model('Accomodation', accomodationSchema)
module.exports = Accomodation;