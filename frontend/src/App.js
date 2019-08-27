import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter,Route ,Switch,Redirect} from 'react-router-dom';

import SignIn from './component/formcomponent/signin';
import EventComponent from './pages/event';
import BookingComponent from './pages/booking';
import SignUp from './component/formcomponent/signup';

import ButtonAppBar from './component/ButtonAppBar';

function App() {
  return (
    <BrowserRouter>
     <Fragment>
        <ButtonAppBar/>
        <Switch>
          <Redirect from='/' to='/signin' exact/>
          <Route  path='/signin' component={SignIn}/>
          <Route  path='/signup' component={SignUp}/>
          <Route path='/event' component={EventComponent}/>
          <Route path='/booking' component={BookingComponent}/>
        </Switch>
     </Fragment>
    </BrowserRouter>
  );
}

export default App;
