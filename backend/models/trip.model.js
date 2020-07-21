const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tripSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    name:{
        type:String,
    }, 
    dateSince: {
        type:String,
    },
    dateTo: {
        type:String,
    },
    timeStamp:{
        type:Date
    },
    // countries:[{type: Schema.Types.ObjectId, ref:'Country'}],
    // accomodations:[{type: Schema.Types.ObjectId, ref:'Accomodation'}],
    // destinations:[{type: Schema.Types.ObjectId, ref:'Destination'}],
    // list:[{type: Schema.Types.ObjectId, ref:'List'}],
    // countriesInfo:[{type: Schema.Types.ObjectId, ref:'CountryInfo'}]
})
const Trip = mongoose.model('Trip', tripSchema)
module.exports = Trip;