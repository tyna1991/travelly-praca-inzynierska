// import config from 'config';
import { authHeader } from '../_helpers/auth-header';
import { userService } from '../_services/user.service';

export const tripService = {
    set,
    getAll,
    modifyEvents,
    getDashboardTrip,
    getTravelPointsTrip,
    addEventsToTrip,
    getList,
    addToList,
    updateList,
    getTripToEdit,
    removeTrip,
    getEvents,
    addCountryInfo,
    getDirections,
    getCountryInfo,
    deleteList
};

//set Trip
function set(trip, countries, destinations, accomodations, edition) {
    accomodations=accomodations.filter(accomodation=>{return accomodation.name!==''});
    destinations=destinations.filter(destination=>{return destination.name!==''});
    accomodations = accomodations.map(accomodation=>{delete accomodation.disabled; return accomodation})
    destinations = destinations.map(destination=>{delete destination.disabled; return destination})
    countries = countries.map(country=>{delete country.name; return country});
    countries = countries.map(country=>{delete country.info; return country});
    
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({ trip, countries, destinations, accomodations, edition })
    };

    return fetch(`/trips/trip/set`, requestOptions).then(handleResponse);
}

// get All Trips
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    return fetch(`/trips/all`, requestOptions).then(handleResponse);
}


function modifyEvents(id, events){
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({ id, events })
    };
    return fetch(`/trips/events/mod`, requestOptions).then(handleResponse);
}

function addToList(id, list){
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({ id, list })
    };
    return fetch(`/checklist/add`, requestOptions).then(handleResponse);
}
function updateList(id, list){
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({ id, list })
    };
    return fetch(`/checklist/mod`, requestOptions).then(handleResponse);
}
function deleteList(id, idElem){
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(),'Content-Type': 'application/json'},
        body: JSON.stringify({ id, idElem })
    };
    return fetch(`/checklist/delete`, requestOptions).then(handleResponse);
}


function logout() {
    userService.logout();
}


//get trip to display dashboard
function getDashboardTrip(id){
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    if(!id){
        id=0;
    }
    return fetch(`/trips/dashboard/${id}`, requestOptions).then(handleResponse);
}

function getEvents(id){
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    if(!id){
        id=0;
    }
    return fetch(`/trips/events/${id}`, requestOptions).then(handleResponse);
}

function getTravelPointsTrip(id){
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    if(!id){
        id=0;
    }
    return fetch(`/trips/travel-points/${id}`, requestOptions).then(handleResponse);
}

function addEventsToTrip(destinations, id){
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({ destinations, id })
    };
    return fetch(`/trips/events`, requestOptions).then(handleResponse);
}

function getList(id){
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    if(!id){
        id=0;
    }
    return fetch(`/checklist/${id}`, requestOptions).then(handleResponse);
}

function getTripToEdit(id, filter){
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(),'Content-Type': 'application/json'},
    };
    if(!filter.length){
        filter.push("null");
    }
    if(!id){
        id=0;
    }
    return fetch(`/trips/edit/${id}/${filter}`, requestOptions).then(handleResponse);
}

function removeTrip(id){
    const requestOptions = {
        method: 'DELETE',
        headers: {...authHeader()},
    };
    return fetch(`/trips/delete/${id}`, requestOptions).then(handleResponse);
}

function addCountryInfo(tripId, idCountry, info){
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json'},
        body: JSON.stringify({tripId, idCountry,info})
    };
    return fetch(`/countries/info`, requestOptions).then(handleResponse);
}

//get informations about country of trip passed by id 
function getCountryInfo(id){
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    return fetch(`/countries/info/${id}`, requestOptions).then(handleResponse);
}

function getDirections(id){
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    if(!id){
        id=0;
    }
    return fetch(`/directions/${id}`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //window.location.reload(true);
            }
            
            const error = (data && data.message) || response.statusText;
            
            return Promise.reject(error);
        }
        return data;
    });
}