import { tripConstants } from '../_constants/trip.constants';
import { countryService } from '../_services/country.service';
import { alertActions } from './alert.actions';

export const countryActions = {
    getAllCountries,
    removeCountries,
};

function getAllCountries() {
    return dispatch => {
        dispatch(request());
        countryService.getAll()
            .then(
                countries => { 
                    dispatch(success(countries));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function request() { return { type: tripConstants.GET_ALL_COUNTRIES } }
    function success(countries) { return { type: tripConstants.GET_ALL_COUNTRIES_SUCCESS, countries } }
    function failure(error) { return { type: tripConstants.GET_ALL_COUNTRIES_ERROR, error } }
}

// function getCountryById(id) {
//     return dispatch => {
//         dispatch(request());
//         countryService.getById(id)
//             .then(
//                 country => dispatch(success(country)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: tripConstants.GET_COUNTRY_BY_ID } }
//     function success(country) { return { type: tripConstants.GET_COUNTRY_BY_ID_SUCCESS, country } }
//     function failure(error) { return { type: tripConstants.GET_COUNTRY_BY_ID_ERROR, error } }
// }

function removeCountries() {
    return dispatch => {
        dispatch(request());
    };

    function request() { return { type: tripConstants.REMOVE_COUNTRIES } }
}
