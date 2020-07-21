import {
  countryInfoConstants
} from '../_constants/countryInfo.constants';


const initialState = {
  countriesInfoData:{
    countriesInfo:[],
    loading: '',
  }
};

export default function getCountryInfo(state = initialState, action) {
  switch (action.type) {
    case countryInfoConstants.ADD_COUNTRY_INFO_REQUEST:
      return {
        countriesInfoData:{
          loading: true,
          countriesInfo: state.countriesInfoData.countriesInfo
        }
      };
    case countryInfoConstants.ADD_COUNTRY_INFO_SUCCESS:
      return {
        countriesInfoData:{
          loading: false,
          countriesInfo: action.info
        }
      };
    case countryInfoConstants.ADD_COUNTRY_INFO_ERROR:
      return {
        countriesInfoData:{
          loading: true,
          countriesInfo: state.countriesInfoData.countriesInfo
        }
      };
      case countryInfoConstants.GET_COUNTRY_INFO_REQUEST:
      return {
        countriesInfoData:{
          loading: true,
          countriesInfo: state.countriesInfoData.countriesInfo
        }
      };
    case countryInfoConstants.GET_COUNTRY_INFO_SUCCESS:
      return {
        countriesInfoData:{
          loading: false,
          countriesInfo: action.info
        }
      };
    case countryInfoConstants.GET_COUNTRY_INFO_ERROR:
      return {
        countriesInfoData:{
          loading: true,
          countriesInfo: state.countriesInfoData.countriesInfo
        }
      };
      default:
      return state
}
}