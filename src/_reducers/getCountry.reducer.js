import { tripConstants } from '../_constants/trip.constants';

const initialState = {country:[], loading:false};

export default function addTrip(state = initialState, action) {
  switch (action.type) {
      case tripConstants.GET_COUNTRY_BY_ID:
      return {
        loading: true,
        country: state.country
      };
    case tripConstants.GET_COUNTRY_BY_ID_SUCCESS:
      return {
        loading: false,
        country: [...state.country, action.country],
      };
    case tripConstants.GET_COUNTRY_BY_ID_ERROR:
      return {};
      case tripConstants.REMOVE_COUNTRIES:
      return {
        country:[]
      };
    default:
      return state
  }
}