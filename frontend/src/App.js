import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter,Route ,Switch,Redirect} from 'react-router-dom';

import SignIn from './component/formcomponent/signin';
import EventComponent from './pages/event';
import BookingComponent from './pages/booking';
import SignUp from './component/formcomponent/signup';
import ButtonAppBar from './component/ButtonAppBar';

import {connect } from 'react-redux';

const App = ({ token }) => {
  return (
    <BrowserRouter>
     <Fragment>
        <ButtonAppBar />
        {  console.log(token, '------token---------')}
        <Switch>
          {!token && <Redirect from='/' to='/signin' exact/>}
          {token && <Redirect from='/signin' to='/event' exact/>}
          {token && <Redirect from='/auth' to='/event' exact/>}
          {!token && <Route  path='/signin' component={SignIn}/>}
          {!token && <Route  path='/signup' component={SignUp}/>}
          <Route path='/event' component={EventComponent}/>
          {token && <Route path='/booking' component={BookingComponent}/>}
        </Switch>
     </Fragment>
    </BrowserRouter>
  );
}


const mapStateToProps = state => ({
  token:state.user.userLoginInfo.token,
  userId:state.user.userLoginInfo.userId
});


export default connect(mapStateToProps)(App);

