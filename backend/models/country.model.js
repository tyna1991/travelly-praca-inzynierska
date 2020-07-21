const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const countrySchema = new Schema(
    {
        idTrip:{
            type:Schema.Types.ObjectId,
            ref:'Trip'
        },
        idOfCountry:{
        type:Schema.Types.ObjectId,
        ref:'countryOfTheWorld'
    },
    countriesInfo:[{type: Schema.Types.ObjectId, ref:'CountryInfo'}]}
)
const Country = mongoose.model('Country', countrySchema)
module.exports = Country;