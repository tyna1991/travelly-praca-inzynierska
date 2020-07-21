const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const countriesInfoSchema = new Schema({
    trip:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'Trip'
    },
    idCountry:{
        type:Schema.Types.ObjectId,
        required: true,
        ref:'Country'
    },
    text: {
        type:String,
        required: false,
    }
})
const CountryInfo = mongoose.model('CountryInfo', countriesInfoSchema)
module.exports = CountryInfo;