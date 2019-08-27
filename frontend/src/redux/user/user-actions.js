import UserActionsTypes from "./user-actions-types";
import axios from 'axios';

export const handleUserInput = event => {
    return {
      type: UserActionsTypes.GET_USER_INPUT,
      payload: event.target

      }    
  };

  export const login = (event)=>{
      return (dispatch, getState) => {
        event.preventDefault();
        if(getState().user.email.length === 0 || getState().user.password.length === 0)
            return;
        const dataQuery= {
            query : `
            query{
                login(email:"${getState().user.email}",password:"${getState().user.password}"){
                    userId
                    token
                    tokenExpiration
                }
            }`
        };
    
        axios.post('http://localhost:8000/graphql',JSON.stringify(dataQuery),{
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      console.log('---------------------',response.data)
      dispatch({
          type:UserActionsTypes.GET_USER_LOGIN,
          payload:response.data.data
      })
    })
    .catch(function(error) {
      console.log(error)
    })
    console.log('-------', JSON.stringify(dataQuery));
  }
};

export const signup = (event)=>{
    return (dispatch, getState) => {
      event.preventDefault();
      if(getState().user.email.length === 0 || getState().user.password.length === 0)
          return;
      const dataQuery= {
      query : `
          mutation{
          createUser(userInput:{email:"${getState().user.email}",
              password:"${getState().user.password}"}){
              _id
              email
          }
      }`
      }

      axios.post('http://localhost:8000/graphql',JSON.stringify(dataQuery),{
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    console.log('---------------------',response.data)
    dispatch({
        type:UserActionsTypes.GET_USER_AUTHENTICATED,
        payload:response.data.data
    })
  })
  .catch(function(error) {
    console.log(error)
  })
  console.log('-------', JSON.stringify(dataQuery));
}
};