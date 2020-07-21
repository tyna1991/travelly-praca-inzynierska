const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const routeSchema = new Schema({
    tripId:{
        type:Schema.Types.ObjectId,
        ref:'Trip',
        required: true,
    }, 
    date: {
        type:String,
        required: false,
    },
    from: {
        type:Schema.Types.ObjectId,
        ref:'Destination',
        required: true,
    },
    to: {
        type:Schema.Types.ObjectId,
        ref:'Destination',
        required: true,
    },
    date: {
        type:String,
        required: false,
    },
})
const Route = mongoose.model('Route', routeSchema)
module.exports = Route;