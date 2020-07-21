const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    code:{
        type:String
    },
    name:{
        type:String
    },
    language:{
        type:String
    },
    capitalCity:{
        type:String
    },
    currency:{
        type:String
    },
    religion:{
        type:String
    },
    UE:{
        type:String
    },
})
const countryOfTheWorld = mongoose.model('countryOfTheWorld', CountrySchema, 'countriesOfTheWorld')
module.exports = countryOfTheWorld;