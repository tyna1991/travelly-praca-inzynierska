import { userConstants } from '../_constants/user.constants';

const initialState = 1 ? { loggedIn: true, user:{login:''} } : {isLogginFailure: undefined};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        isLogginFailure: true
      };
    case userConstants.LOGOUT:
      return {
        user:''
      };
    case userConstants.CLEAR_LOGIN_PROCESS:
      return {
        isLogginFailure: undefined
      };
    default:
      return state
  }
}