// import config from 'config';
import { authHeader } from '../_helpers/auth-header';
import { setAccessToken } from '../_helpers/accessToken';
import { history } from '../_helpers/history';
import { userConstants } from '../_constants/user.constants';


export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update, //nie wdrożone
    getLogin,
    delete: _delete //nie wdrożone
};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json'},
        credentials: 'include' ,
        body: JSON.stringify(user)
    };
    return fetch(`/users/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if(response && response.data){
                setAccessToken(response.data.accessToken);
                
                return response.data.user;
            }
            return;
        });
}

function logout() {
    document.cookie = "travid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push('/');
    return { type: userConstants.LOGOUT };
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:3000/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:3000/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`/users/register`, requestOptions).then(handleResponse);
}

function getLogin() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' }, 
    };
    return fetch(`/users/get-login`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:3000/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:3000/users/${id}`, requestOptions).then(handleResponse);
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