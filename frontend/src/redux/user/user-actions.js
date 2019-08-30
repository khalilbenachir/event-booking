import UserActionsTypes from "./user-actions-types";
import axios from "axios";

export const handleUserInput = event => {
  return {
    type: UserActionsTypes.GET_USER_INPUT,
    payload: event.target
  };
};
export const handleDateInput = date => {
  return {
    type: UserActionsTypes.GET_DATE_VALUE,
    payload: date.toString()
  };
};

export const handleAmountInput = amount => {
  return {
    type: UserActionsTypes.GET_PRICE_VALUE,
    payload: amount.target
  };
};

export const login = event => {
  return (dispatch, getState) => {
    event.preventDefault();
    if (
      getState().user.email.length === 0 ||
      getState().user.password.length === 0
    )
      return;
    const dataQuery = {
      query: `
            query{
                login(email:"${getState().user.email}",password:"${
        getState().user.password
      }"){
                    userId
                    token
                    tokenExpiration
                }
            }`
    };

    axios
      .post("http://localhost:8000/graphql", JSON.stringify(dataQuery), {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        console.log("---------------------", response.data);
        dispatch({
          type: UserActionsTypes.GET_USER_LOGIN,
          payload: response.data.data.login
        });
      })
      .catch(function(error) {
        dispatch({
          type: UserActionsTypes.GET_USER_LOGOUT,
          payload: error.message
        });
      });
  };
};

export const fetchEventCreated = event => {
  return dispatch => {
    const dataQuery = {
      query: `
      query{
        events{
          _id
          title
          description
          price
          date
           creator{
            _id
            email
          }
          }
      }`
    };

    axios
      .post("http://localhost:8000/graphql", JSON.stringify(dataQuery), {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        console.log("===============");
        dispatch({
          type: UserActionsTypes.GET_EVENT_CREATED,
          payload: response.data.data.events
        });
      })
      .catch(function(error) {
        dispatch({
          type: UserActionsTypes.GET_USER_LOGOUT,
          payload: error.message
        });
      });
  };
};

export const handleCreateEvent = event => {
  return (dispatch, getState) => {
    event.preventDefault();

    if (
      getState().user.title.length === 0 ||
      getState().user.description.length === 0 ||
      getState().user.date.length === 0 ||
      getState().user.amount <= 0
    )
      return;

    const dataQuery = {
      query: `
            mutation{
              createEvent(eventInput:{title:"${getState().user.title}",
                description:"${getState().user.description}",
                price:"${parseFloat(getState().user.amount.toString())}",
                date:"${getState().user.date}"})
                {
                  title
                  description
                  price
                  date
                  
            }
        }`
    };

    axios
      .post("http://localhost:8000/graphql", JSON.stringify(dataQuery), {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + getState().user.userLoginInfo.token
        }
      })
      .then(function(response) {
        dispatch({
          type: UserActionsTypes.HANDLE_CREATE_EVENT,
          payload: response.data.data.createEvent
        });
      })
      .catch(function(error) {
        console.log(error.message);
      });
  };
};

export const logout = () => {
  return {
    type: UserActionsTypes.GET_USER_LOGOUT,
    payload: "log out successfully"
  };
};

export const signup = event => {
  return (dispatch, getState) => {
    event.preventDefault();
    if (
      getState().user.email.length === 0 ||
      getState().user.password.length === 0
    )
      return;
    const dataQuery = {
      query: `
          mutation{
          createUser(userInput:{email:"${getState().user.email}",
              password:"${getState().user.password}"}){
              _id
              email
          }
      }`
    };

    axios
      .post("http://localhost:8000/graphql", JSON.stringify(dataQuery), {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        dispatch({
          type: UserActionsTypes.GET_USER_SIGNUP,
          payload: response.data.data.createUser
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};
