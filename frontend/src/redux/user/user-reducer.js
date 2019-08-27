import UserActionsTypes from "./user-actions-types";

const INITIAL_STATE = {
    login:false,
    email:'',
    password:'',
    firstname:'',
    lastname:'',
    userInfo:{}
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.GET_USER_INPUT:
        return {
          ...state,
          [action.payload.name] : action.payload.value
        };
    case UserActionsTypes.GET_USER_AUTHENTICATED:
        return {
            ...state,
            userInfo : action.payload
        };
    case UserActionsTypes.GET_USER_LOGIN:
        return {
            ...state,
            userInfo : action.payload
        };
    default:
      return state;
  }
};

export default userReducer;


/*
case UserActionsTypes.GET_USER_AUTHENTICATED:
      return {
        ...state,
        location: action.payload
      };

*/ 