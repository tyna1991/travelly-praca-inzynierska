const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const listSchema = new Schema({
    term:{
        type:String,
        required: false,
    }, 
    checked:{
        type:Boolean,
        required: false,
    },
    tripId: {
        type:Schema.Types.ObjectId,
        ref:'Trip',
        required: true,
    },
})
const List = mongoose.model('List', listSchema)
module.exports = List;