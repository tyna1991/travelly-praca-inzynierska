import { countryInfoConstants } from '../_constants/countryInfo.constants';
import { countryInfoService } from '../_services/countryInfo.service';


export const countryInfoActions = {
    addCountryInfo,
    getCountryInfo,
};

function addCountryInfo(idTrip, idCountry, info) {
    return dispatch => {
        dispatch(request());
        countryInfoService.addCountryInfo(idTrip, idCountry, info)
            .then(
                info => {dispatch(success(info));},
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: countryInfoConstants.ADD_COUNTRY_INFO_REQUEST } }
    function success(info) { return { type: countryInfoConstants.ADD_COUNTRY_INFO_SUCCESS, info } }
    function failure(error) { return { type: countryInfoConstants.ADD_COUNTRY_INFO_ERROR, error } }  
}
function getCountryInfo(idTrip) {
    return dispatch => {
        dispatch(request());
        if(idTrip){
            countryInfoService.getCountryInfo(idTrip)
                .then(
                    info => {dispatch(success(info));},
                    error => dispatch(failure(error.toString()))
                );
        }else{
            dispatch(success([]));
        }
    };

    function request() { return { type: countryInfoConstants.GET_COUNTRY_INFO_REQUEST } }
    function success(info) { return { type: countryInfoConstants.GET_COUNTRY_INFO_SUCCESS, info } }
    function failure(error) { return { type: countryInfoConstants.GET_COUNTRY_INFO_ERROR, error } }  
}

