import { tripConstants } from '../_constants/trip.constants';

const initialState = {countries:[], loading:false};

export default function addTrip(state = initialState, action) {
  switch (action.type) {
    case tripConstants.GET_ALL_COUNTRIES:
      return {
        loading: true,
        countries: state.countries
      };
    case tripConstants.GET_ALL_COUNTRIES_SUCCESS:
      return {
        loading: false,
        countries: action.countries.map(({ _id: id, ...rest }) => ({ id, ...rest }))
      };
    default:
      return state
  }
}