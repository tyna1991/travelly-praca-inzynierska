import alert from './../_reducers/alert.reducer';
import authentication from './../_reducers/authentication.reducer';
import registration from './../_reducers/registration.reducer';
import users from './../_reducers/users.reducer';
import getTrips from './../_reducers/getTrips.reducer';
import getCountries from './../_reducers/getCountries.reducer';
import getCountry from './../_reducers/getCountry.reducer';
import getTrip from './../_reducers/getTrip.reducer';
import getCountryInfo from './../_reducers/countryInfo.reducer';
import { combineReducers } from 'redux'
export default combineReducers({
    alert,
    authentication,
    registration,
    users,
    getTrips,
    getCountries,
    getCountry,
    getTrip,
    getCountryInfo
  })