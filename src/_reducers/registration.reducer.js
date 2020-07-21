import { userConstants } from '../_constants/user.constants';
const initialState = {
  isRegistrationError: undefined,
  isRegistrationSuccess: undefined
}
export default function registration(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { 
        registering: true,
        
       };
    case userConstants.REGISTER_SUCCESS:
      return {
        type:'success',
        isRegistrationSuccess: true
      };
    case userConstants.REGISTER_FAILURE:
      return {
        type:'error',
        isRegistrationError: true
      };
      case userConstants.CLEAR_REGISTER_PROCESS:
      return {
        isRegistrationError: undefined
      };
    default:
      return state
  }
}