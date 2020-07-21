import { tripConstants } from '../_constants/trip.constants';
import { tripService } from '../_services/trip.service';
import { alertActions } from './alert.actions';
import { history } from '../_helpers/history';

export const tripActions = {
    setTrip,
    getAll, 
    getById,
    modifyEvents,
    addToList,
    getDashboardTrip, 
    getTravelPointsTrip,
    addEventsToTrip,
    getList,
    updateList,
    getTripToEdit,
    deleteTrip,
    getEvents,
    getDirections,
    deleteList
};


function setTrip(trip, countries, destinations, accomodations, bool) {
    return dispatch => {
        dispatch(request());
        tripService.set(trip, countries, destinations, accomodations, bool)
            .then(
                data => {dispatch(success(data));
                    history.push({pathname:`/home/trip/${data.trip._id}/dashboard`, state:data.trip._id})
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request() { return { type: tripConstants.SET_REQUEST} }
    function success(data) { return { type: tripConstants.SET_SUCCESS, data  } }
    function failure(error) { return { type: tripConstants.SET_ERROR, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        tripService.getAll()
            .then(
                trips => dispatch(success(trips)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tripConstants.GET_ALL_TRIPS_REQUEST } }
    function success(trips) { return { type: tripConstants.GET_ALL_TRIPS_SUCCESS, trips } }
    function failure(error) { return { type: tripConstants.GET_ALL_TRIPS_ERROR, error } }
}

function getById(id) {
    let location = window.location.href;
    location = location[location.length-1]==='/' ? location.slice(0,-1) : location;
    const lastElement = location.substring(location.lastIndexOf('/') + 1);
    history.push({pathname:`/home/trip/${id}/${lastElement}`, state:id})
    return dispatch => {
        dispatch(request(id));
    }     
                
    function request(id) { return { type: tripConstants.GET_TRIP_BY_ID_REQUEST, id } }
}

function modifyEvents(id, events) {
    return dispatch => {
        dispatch(request(id, events));
        tripService.modifyEvents(id, events)
            .then(
                data => {dispatch(success(data));
                    // history.push({pathname:'/home/trip/'+`${id}/timetable`, state:id})
                  },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id, events) { return { type: tripConstants.CHANGE_EVENTS_DATA_REQUEST, id, events } }
    function success(data) { return { type: tripConstants.CHANGE_EVENTS_DATA_SUCCESS, data } }
    function failure(error) { return { type: tripConstants.CHANGE_EVENTS_DATA_ERROR, error } }
}
function getEvents(id) {
    return dispatch => {
        dispatch(request(id));
        tripService.getEvents(id)
            .then(
                events => {dispatch(success(events));
                  },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: tripConstants.GET_EVENTS_TRIP_REQUEST, id } }
    function success(events) { return { type: tripConstants.GET_EVENTS_TRIP_SUCCESS, events } }
    function failure(error) { return { type: tripConstants.GET_EVENTS_TRIP_ERROR, error } }
}

function addToList(id, list) {
    return dispatch => {
        dispatch(request(id, list));
        tripService.addToList(id, list)
            .then(
                list => {dispatch(success(list));
                   // history.push({pathname:`/timetable/${id}`, state:id})
                  },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id, list) { return { type: tripConstants.CHANGE_LIST_REQUEST, id, list } }
    function success(list) { return { type: tripConstants.CHANGE_LIST_SUCCESS, list } }
    function failure(error) { return { type: tripConstants.CHANGE_LIST_ERROR, error } }  
}

function deleteList(id, idElem) {
    return dispatch => {
        dispatch(request(id, idElem));
        tripService.deleteList(id, idElem)
            .then(
                data => {dispatch(success(data));},
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id, idElem) { return { type: tripConstants.DELETE_LIST_REQUEST, id, idElem } }
    function success(list) { return { type: tripConstants.DELETE_LIST_SUCCESS, list } }
    function failure(error) { return { type: tripConstants.DELETE_LIST_ERROR, error } }  
}

function updateList(id, list) {
    return dispatch => {
        dispatch(request(id, list));
        tripService.updateList(id, list)
            .then(
                data => {dispatch(success(data));},
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id, list) { return { type: tripConstants.UPDATE_LIST_REQUEST, id, list } }
    function success(list) { return { type: tripConstants.UPDATE_LIST_SUCCESS, list } }
    function failure(error) { return { type: tripConstants.UPDATE_LIST_ERROR, error } }  
}

function getList(id) {
    return dispatch => {
        dispatch(request(id));
        tripService.getList(id)
            .then(
                data => {dispatch(success(data));
                  },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: tripConstants.GET_LIST_REQUEST, id, } }
    function success(list) { return { type: tripConstants.GET_LIST_SUCCESS, list } }
    function failure(error) { return { type: tripConstants.GET_LIST_ERROR, error } } 
}

function getDashboardTrip(id){
    return dispatch => {
        dispatch(request(id));    
        tripService.getDashboardTrip(id)
            .then(
               (data) => { if(data.trip === null){
                history.push({pathname:'/home/trip/dashboard', state:undefined})}
                else{
                    dispatch(success(data));
                }
               },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tripConstants.GET_DASHBOARD_TRIP_REQUEST } }
    function success(data) { return { type: tripConstants.GET_DASHBOARD_TRIP_SUCCESS, data } }
    function failure(error) { return { type: tripConstants.GET_DASHBOARD_TRIP_ERROR, error } }
}

function getTravelPointsTrip(id){
    return dispatch => {
        dispatch(request());
        tripService.getTravelPointsTrip(id)
            .then(
               (data) => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tripConstants.GET_TRAVELPOINTS_TRIP_REQUEST } }
    function success(data) { return { type: tripConstants.GET_TRAVELPOINTS_TRIP_SUCCESS, data } }
    function failure(error) { return { type: tripConstants.GET_TRAVELPOINTS_TRIP_ERROR, error } }
}

function addEventsToTrip(destinations, id){
    return dispatch => {
        dispatch(request(destinations));
        tripService.addEventsToTrip(destinations, id)
            .then(
               (data) => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tripConstants.ADD_EVENTS_TRIP_REQUEST } }
    function success(data) { return { type: tripConstants.ADD_EVENTS_TRIP_SUCCESS, data } }
    function failure(error) { return { type: tripConstants.ADD_EVENTS_TRIP_ERROR, error } }
}

function getTripToEdit(id, data){
    return dispatch => {
        dispatch(request());
        let filter = [];
        data.trip.tripName==="" && filter.push('trip');
        !data.countries.length && filter.push('countries')
        !data.destinations.length && filter.push('destinations')
        !data.accomodations.length && filter.push('accomodations')
        tripService.getTripToEdit(id, filter)
            .then(
               (data) => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: tripConstants.GET_EDITED_TRIP_REQUEST } }
    function success(data) { return { type: tripConstants.GET_EDITED_TRIP_SUCCESS, data } }
    function failure(error) { return { type: tripConstants.GET_EDITED_TRIP_ERROR, error } }
}

function getDirections(id) {
    return dispatch => {
        dispatch(request(id));

        tripService.getDirections(id)
            .then(
                data => {dispatch(success(data));
                  },
                error => dispatch(failure(error.toString()))
            );
    };
    function request(id) { return { type: tripConstants.GET_DIRECTIONS_REQUEST, id } }
    function success(data) { return { type: tripConstants.GET_DIRECTIONS_SUCCESS, data } }
    function failure(error) { return { type: tripConstants.GET_DIRECTIONS_ERROR, error } }
}

function deleteTrip(id) {
    return dispatch => {
        dispatch(request(id));

        tripService.removeTrip(id)
            .then(
                () => {dispatch(success());
                //   history.push({pathname:'/home/trip/'+`${id}/dashboard`})},
                history.push({pathname:'/home/trip/dashboard', state:undefined})},
                error => dispatch(failure(error.toString()))
            );
    };

    function request(id) { return { type: tripConstants.REMOVE_TRIP_REQUEST, id } }
    function success() { return { type: tripConstants.REMOVE_TRIP_SUCCESS }}
    function failure(error) { return { type: tripConstants.REMOVE_TRIP_ERROR, error } } 
}


