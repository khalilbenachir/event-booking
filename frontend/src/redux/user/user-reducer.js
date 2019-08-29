import UserActionsTypes from "./user-actions-types";

const INITIAL_STATE = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  userLoginInfo: {},
  userSignupInfo: {},
  error: {},
  date: new Date(),
  description: {},
  amount: 0,
  title: {},
  eventInfo: {},
  eventCreated:[]
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.GET_USER_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
      case UserActionsTypes.GET_EVENT_CREATED:
        return {
          ...state,
          eventCreated: action.payload
        };
    case UserActionsTypes.HANDLE_CREATE_EVENT:
      return {
        ...state,
        eventInfo: action.payload
      };
    case UserActionsTypes.GET_DATE_VALUE:
      return {
        ...state,
        date: action.payload
      };
    case UserActionsTypes.GET_PRICE_VALUE:
      return {
        ...state,
        amount: parseFloat(action.payload.value)
      };
    case UserActionsTypes.GET_USER_SIGNUP:
      return {
        ...state,
        userSignupInfo: action.payload
      };
    case UserActionsTypes.GET_USER_LOGIN:
      return {
        ...state,
        userLoginInfo: action.payload
      };
    case UserActionsTypes.GET_USER_LOGOUT:
      return {
        ...state,
        userLoginInfo: {},
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
