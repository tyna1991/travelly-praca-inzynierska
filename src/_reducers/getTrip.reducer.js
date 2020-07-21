import {
  tripConstants
} from '../_constants/trip.constants';


const initialState = {
  data: {
    trip:{
      id:0,
      dateSince:'',
      dateTo:'',
      tripName: ''
    }, 
    countries: [],
    destinations: [],
    accomodations: [],
    list: [],
    events: [],
    routes: [],
    countryOfTheWorld:[]
  },
  loading: '',
};

export default function getTrip(state = initialState, action) {
  switch (action.type) {
    case tripConstants.SET_REQUEST:
      return {
        loading: true,
        data: {...state.data, countries:[]},
      };
    case tripConstants.SET_SUCCESS:
      return {
        loading: false,
        data: {...state.data, 
          trip:{id:action.data.trip._id, tripName:action.data.trip.name, dateSince:action.data.trip.dateSince, dateTo: action.data.trip.dateTo},
          countries:action.data.countries, accomodations:action.data.accomodations, destinations:action.data.destinations},
          events:action.data.events
      };
    case tripConstants.SET_ERROR:
      return {
        loading: false,
        data: state.data,
      };
      case tripConstants.GET_EDITED_TRIP_REQUEST:
      return {
        loading: true,
        data: state.data,
      };
    case tripConstants.GET_EDITED_TRIP_SUCCESS:
      return {
        loading: false,
        edited:true,
        data: {...state.data, 
          trip: Object.keys(action.data.trip).length !== 0 ?  {id:action.data.trip._id, tripName:action.data.trip.name, dateSince:action.data.trip.dateSince, dateTo: action.data.trip.dateTo} : state.data.trip,
          countries: [...action.data.countries.map(elem=>{return {id:elem.idOfCountry, tripId:elem.idTrip, nameCountry:elem.name}})],
          accomodations:action.data.accomodations.length ? action.data.accomodations.map(({ _id: id, ...rest }) => {return { id, ...rest }}) : state.data.accomodations, 
          destinations:action.data.destinations.length ? action.data.destinations.map(({ _id: id, ...rest }) => {return { id, ...rest }}) : state.data.destinations},
      };
    case tripConstants.GET_EDITED_TRIP_ERROR:
      return {};
    case tripConstants.GET_DASHBOARD_TRIP_REQUEST:
      return {
        data: {
            ...state.data,
            countries: []
          },
          list: state.list,
          loading: true,
      };
    case tripConstants.GET_DASHBOARD_TRIP_SUCCESS:
    if((Object.keys(action.data).length === 0 && action.data.constructor === Object) || Object.keys(action.data).length === 0){
      return initialState;
    }
    return {
        loading: false,
          list: state.list,
          data: {
            ...state.data,
            trip:{
              id:action.data.trip._id,
              dateSince:action.data.trip.dateSince,
              dateTo:action.data.trip.dateTo,
              tripName:action.data.trip.name,
            },
            countries: [...action.data.countries.map(elem=>{return {id:elem.idOfCountry}})],
            accomodations : [],
            destinations: [],

            countryOfTheWorld: [...action.data.countryOfTheWorld],
          },
      };
    case tripConstants.GET_DASHBOARD_TRIP_ERROR:
      return {};
    case tripConstants.GET_TRAVELPOINTS_TRIP_REQUEST:
      return {
        data: state.data,
          loading: true,
      };
    case tripConstants.GET_TRAVELPOINTS_TRIP_SUCCESS:
      if((Object.keys(action.data).length === 0 && action.data.constructor === Object) || Object.keys(action.data).length === 0){
        return initialState;
      }
          return {
            loading: false,
              data: {
                ...state.data,
                trip:{
                  id:action.data.trip._id,
                  dateSince:action.data.trip.dateSince,
                  dateTo:action.data.trip.dateTo,
                  tripName:action.data.trip.name,
                },
                accomodations: action.data.accomodations,
                destinations: action.data.destinations.map(({ _id: id, ...rest }) => {return { id, ...rest }}),
                countries: action.data.countries.map(country=>{
                  return {id:country.id, name:country.name}
                }),
              },
              loadedPoints:true
          };
 
    case tripConstants.GET_TRAVELPOINTS_TRIP_ERROR:
      return {
        loadedPoints:true
      };
    case tripConstants.ADD_EVENTS_TRIP_REQUEST:
      return {
        data: state.data,
          loading: true,
      };
    case tripConstants.ADD_EVENTS_TRIP_SUCCESS:
      return {
        loading: false,
          data: {
            ...state.data,
            destinations: [...state.data.destinations,  ...action.data.destinations.map(({ _id: id, ...rest }) => {return { id, ...rest }}),],
            events: [...state.data.events,  ...action.data.events],
          },
      };
    case tripConstants.ADD_EVENTS_TRIP_ERROR:
      return {};
    case tripConstants.GET_TRIP_BY_ID_REQUEST:
      return {
        data: state.data,
          loading: true,
      };
    case tripConstants.GET_TRIP_BY_ID_SUCCESS:
      return {
        loading: false,
          data: {
            ...state.data,
            trip: action.data.trip,
            countries: action.data.countries
          },
      };
    case tripConstants.GET_TRIP_BY_ID_ERROR:
      return {};
    case tripConstants.CHANGE_EVENTS_DATA_REQUEST:
      return {
        loading: true,
          data: {
            ...state.data,
            events: action.events
          },
      };
    case tripConstants.CHANGE_EVENTS_DATA_SUCCESS:
      return {
        loading: false,
          data: {
            ...state.data,
            events: action.data.events
          },
      };
    case tripConstants.CHANGE_EVENTS_DATA_ERROR:
      return {};
    case tripConstants.GET_EVENTS_TRIP_REQUEST:
      return {
        loading: true,
        data: state.data
      };
    case tripConstants.GET_EVENTS_TRIP_SUCCESS:
      return {
        loading: false,
          data: {
            ...state.data,
            events: action.events
          },
      };
    case tripConstants.GET_EVENTS_TRIP_ERROR:
      return {};
    case tripConstants.REMOVE_TRIP:
      return {
        data: action.data
      };
    case tripConstants.CHANGE_LIST_REQUEST:
      return {
        data: state.data,
          loading: true,
      };
    case tripConstants.CHANGE_LIST_SUCCESS:
      return {
        data: {
            ...state.data,
            list: [...state.data.list, ...action.list]
          },
          loading: false,
      };
    case tripConstants.CHANGE_LIST_ERROR:
      return {};
      case tripConstants.DELETE_LIST_REQUEST:
      return {
        data: state.data,
          loading: true,
      };
    case tripConstants.DELETE_LIST_SUCCESS:
      return {
        loading: false,
        data:{
          ...state.data,
          list:action.list.map(({ _id: id, ...rest }) => {return { id, ...rest }}),
        }
      };
    case tripConstants.DELETE_LIST_ERROR:
      return {};
    case tripConstants.GET_LIST_REQUEST:
      return {
        data: state.data,
          loading: true,
      };
    case tripConstants.GET_LIST_SUCCESS:
      return {
        data: {
            ...state.data,
            list: action.list.map(({ _id: id, ...rest }) => {return { id, ...rest }}),
          },
          loading: false,
      };
    case tripConstants.GET_LIST_ERROR:
      return {};
    case tripConstants.UPDATE_LIST_REQUEST:
      return {
        data: state.data,
          loading: true,
      };
    case tripConstants.UPDATE_LIST_SUCCESS:
      return {
        data: {
            ...state.data,
            list: action.list.map(({ _id: id, ...rest }) => {return { id, ...rest }}),
          },
          loading: false,
      };
    case tripConstants.UPDATE_LIST_ERROR:
      return {};
    case tripConstants.REMOVE_TRIP_REQUEST:
      return {
        data: state.data,
          loading: true
      };
    case tripConstants.REMOVE_TRIP_SUCCESS:
      return {
        data: state.data
      };
    case tripConstants.REMOVE_TRIP_ERROR:
      return {};
    case tripConstants.GET_DIRECTIONS_REQUEST:
      return {
        data: state.data,
          loading: true
      };
    case tripConstants.GET_DIRECTIONS_SUCCESS:
      return {
        loading: false,
          data: {
            ...state.data,
            trip:{
              id:action.data.trip._id,
              dateSince:action.data.trip.dateSince,
              dateTo:action.data.trip.dateTo,
              tripName:action.data.trip.name,
            },
            events: action.data.events.map(({ _id: id, ...rest }) => {return { id, ...rest }}),
            routes:action.data.routes.map(({ _id: id, ...rest }) => {return { id, ...rest }}),
            destinations: action.data.destinations.map(({ _id: id, ...rest }) => {return { id, ...rest }}),
          },
      };
    case tripConstants.GET_DIRECTIONS_ERROR:
      return {};
      default:
      return state
  }
}