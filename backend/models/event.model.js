const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    trip:{
        type:Schema.Types.ObjectId,
        ref:'Trip',
        required: true,
    }, 
    destination:{
        type:Schema.Types.ObjectId,
        ref:'Destination',
        required: true,
    },
    color:{
        type:String,
        required: false,
    },
    date: {
        type:String,
        required: false,
    },
    since: {
        type:String,
        required: false,
    },
    to: {
        type:String,
        required: false,
    },
})
const Event = mongoose.model('Event', eventSchema)
module.exports = Event;