import UserActionsTypes from "./user-actions-types";

const INITIAL_STATE = {
    email:'',
    password:'',
    firstName:'',
    lastName:'',
    userLoginInfo:{},
    userSignupInfo:{},
    error:{}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.GET_USER_INPUT:
        return {
          ...state,
          [action.payload.name] : action.payload.value
        };
    case UserActionsTypes.GET_USER_SIGNUP:
        return {
            ...state,
            userSignupInfo : action.payload
        };
    case UserActionsTypes.GET_USER_LOGIN:
        return {
            ...state,
            userLoginInfo : action.payload
        };
    case UserActionsTypes.GET_USER_LOGOUT:
      return {
          ...state,
          userLoginInfo:{},
          error : action.payload
      };
  
    default:
      return state;
  }
};

export default userReducer;

