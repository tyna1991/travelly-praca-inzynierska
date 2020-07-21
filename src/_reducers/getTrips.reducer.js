import { tripConstants } from '../_constants/trip.constants';

const initialState = {trips:[{id:'', tripName:'', timeStamp:0}], loading:false};

export default function getTrips(state = initialState, action) {
  switch (action.type) {
    case tripConstants.GET_ALL_TRIPS_REQUEST:
        return {
          loading: true,
          trips: [...state.trips]
    };
    case tripConstants.GET_ALL_TRIPS_SUCCESS:
        return {
          loading: false,
          trips: action.trips
          
    };
    case tripConstants.GET_ALL_TRIPS_ERROR:
        return {};
    default:
      return state
  }
}