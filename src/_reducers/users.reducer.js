import { userConstants } from '../_constants/user.constants';

export default function users(state = {}, action) {
  switch (action.type) {
      case userConstants.GET_LOGIN_REQUEST:
      return {
        loading: true,
        login:''
      };
    case userConstants.GET_LOGIN_SUCCESS:
      return {
        loading:false,
        login: action.user.login
      };
    case userConstants.GET_LOGIN_FAILURE:
      return { 
        error: action.error
      };

    //delete nie obsłużone
    case userConstants.DELETE_REQUEST:
      return {
        ...state,
      };
    case userConstants.DELETE_SUCCESS:
      return {
        
      };
    case userConstants.DELETE_FAILURE:
      return {
        ...state,
      };
    default:
      return state
  }
}