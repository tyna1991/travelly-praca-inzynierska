import { userConstants } from '../_constants/user.constants';
import { userService } from '../_services/user.service';
import { alertActions } from './alert.actions';
import { history } from '../_helpers/history';


export const userActions = {
    login,
    logout,
    register,
    getLogin,
    delete: _delete //do zrobienia w przyszłości
};

function login(user) {
    return dispatch => {
        dispatch(request({ user }));
        userService.login(user)
            .then(
                user => { 
                    dispatch(clearRegisterProcess());
                    dispatch(clearLoginProcess());
                    dispatch(success(user));
                    history.push('/home');
                },
                error => {
                    dispatch(clearRegisterProcess());
                    dispatch(clearLoginProcess());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function clearLoginProcess() { return { type: userConstants.CLEAR_LOGIN_PROCESS } }
    function clearRegisterProcess() { return { type: userConstants.CLEAR_REGISTER_PROCESS } }
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    history.push('/');
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        
        dispatch(request(user));

        userService.register(user)
            .then(
                () => { 
                    dispatch(clearRegisterProcess());
                    dispatch(clearLoginProcess());
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Rejestracja zakończona sukcesem. Teraz możesz się zalogować.'));
                },
                error => {
                    dispatch(clearRegisterProcess());
                    dispatch(clearLoginProcess());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function clearLoginProcess() { return { type: userConstants.CLEAR_LOGIN_PROCESS } }
    function clearRegisterProcess() { return { type: userConstants.CLEAR_REGISTER_PROCESS } }
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getLogin() {
    return dispatch => {
        dispatch(request());

        userService.getLogin()
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_LOGIN_REQUEST } }
    function success(user) { return { type: userConstants.GET_LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_LOGIN_FAILURE, error } }
}

//usuwanie użytkownika -  w przyszłości
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}