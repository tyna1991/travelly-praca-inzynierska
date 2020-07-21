// import config from 'config';
import { authHeader } from '../_helpers/auth-header';
import { userService } from '../_services/user.service';


export const countryInfoService = {
    addCountryInfo,
    getCountryInfo,
};

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
function logout() {
    userService.logout();
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