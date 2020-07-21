// import config from 'config';
import { authHeader } from '../_helpers/auth-header';
import { userService } from '../_services/user.service';

export const countryService = {
    getAll,
};

//get all countries
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()},
    };
    return fetch(`/countries`, requestOptions).then(handleResponse);
}

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//     return fetch(`http://localhost:3000/countries/${id}`, requestOptions).then(handleResponse);
// }

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