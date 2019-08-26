import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter,Route ,Switch} from 'react-router-dom';

import AuthComponent from './pages/auth';
import EventComponent from './pages/event';
import BookingComponent from './pages/booking';

import ButtonAppBar from './component/ButtonAppBar';

function App() {
  return (
    <BrowserRouter>
     <Fragment>
        <ButtonAppBar/>
        <Switch>
          <Route path='/' component={AuthComponent}/>
          <Route path='/auth' component={AuthComponent}/>
          <Route path='/event' component={EventComponent}/>
          <Route path='/booking' component={BookingComponent}/>
        </Switch>
     </Fragment>
    </BrowserRouter>
  );
}

export default App;
